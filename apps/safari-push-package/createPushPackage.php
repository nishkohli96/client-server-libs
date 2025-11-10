<?php

// This script creates a valid push package.
// This script assumes that the website.json file and iconset already exist. 
// This script creates a manifest and signature, zips the folder, and returns the push package. 

// Use this script as an example to generate a push package dynamically.

$package_version = 2; // Change this to the desired push package version.

$certificate_path = "cert_AES.p12"; // Change this to the path where your certificate is located
$certificate_password = "12345"; // Change this to the certificate's import password

// Convenience function that returns an array of raw files needed to construct the package.
function raw_files() {
    return array(
        'icon.iconset/icon_16x16.png',
        'icon.iconset/icon_16x16@2x.png',
        'icon.iconset/icon_32x32.png',
        'icon.iconset/icon_32x32@2x.png',
        'icon.iconset/icon_128x128.png',
        'icon.iconset/icon_128x128@2x.png',
        'website.json'
    );
}

// Copies the raw push package files to $package_dir.
function copy_raw_push_package_files($package_dir) {
    mkdir($package_dir . '/icon.iconset');
    foreach (raw_files() as $raw_file) {
        copy("pushPackage.raw/$raw_file", "$package_dir/$raw_file");
    }
}

// Creates the manifest by calculating the hashes for all of the raw files in the package.
function create_manifest($package_dir, $package_version) {

    // Obtain hashes of all the files in the push package
    $manifest_data = array();
    foreach (raw_files() as $raw_file) {
        $file_contents = file_get_contents("$package_dir/$raw_file");
        if ($package_version === 1) {
            $manifest_data[$raw_file] = sha1($file_contents);
        } else if ($package_version === 2) {
            $hashType = 'sha512';
            $manifest_data[$raw_file] = array(
                'hashType' => $hashType,
                'hashValue' => hash($hashType, $file_contents),
            );
        } else {
            throw new Exception('Invalid push package version.');
        }
    }
    file_put_contents("$package_dir/manifest.json", json_encode((object)$manifest_data));
}

function create_signature($package_dir, $cert_path, $cert_password) {
    $pkcs12 = file_get_contents($cert_path);
    $certs = [];
    if (!openssl_pkcs12_read($pkcs12, $certs, $cert_password)) {
        throw new Exception('Could not read the PKCS#12 certificate. Check password or file path.');
    }

    $manifest_path = "$package_dir/manifest.json";
    $signature_pem_path = "$package_dir/signature.pem";
    $signature_der_path = "$package_dir/signature";

    $cert_data = openssl_x509_read($certs['cert']);
    $private_key = openssl_pkey_get_private($certs['pkey'], $cert_password);

    // Sign manifest.json → creates signature.pem
    if (!openssl_pkcs7_sign(
        $manifest_path,
        $signature_pem_path,
        $cert_data,
        $private_key,
        [],
        PKCS7_BINARY | PKCS7_DETACHED
    )) {
        throw new Exception('Failed to sign manifest.json. Check your certificate validity.');
    }

    // Convert PEM → DER (binary)
    $pem_content = file_get_contents($signature_pem_path);
    $matches = [];
    if (preg_match('~Content-Disposition:[^\n]+\n\n([A-Za-z0-9+=/\r\n]+)\n-----~', $pem_content, $matches)) {
        $signature_der = base64_decode($matches[1]);
        file_put_contents($signature_der_path, $signature_der);
        unlink($signature_pem_path); // remove PEM after conversion
    } else {
        throw new Exception('Could not extract DER from PEM signature.');
    }
}


// Zips the directory structure into a push package, and returns the path to the archive.
function package_raw_data($package_dir) {
    $zip_path = "$package_dir.zip";

    // Package files as a zip file
    $zip = new ZipArchive();
    if (!$zip->open("$package_dir.zip", ZIPARCHIVE::CREATE)) {
        error_log('Could not create ' . $zip_path);
        return;
    }

    $raw_files = raw_files();
    $raw_files[] = 'manifest.json';
    $raw_files[] = 'signature';
    foreach ($raw_files as $raw_file) {
        $zip->addFile("$package_dir/$raw_file", $raw_file);
    }

    $zip->close();
    return $zip_path;
}

// Creates the push package, and returns the path to the archive.
function create_push_package() {
    global $certificate_path, $certificate_password, $package_version;

    // Create a temporary directory in which to assemble the push package
    $package_dir = '/tmp/pushPackage' . time();
    if (!mkdir($package_dir)) {
        unlink($package_dir);
        die;
    }

    copy_raw_push_package_files($package_dir);
    create_manifest($package_dir, $package_version);
    create_signature($package_dir, $certificate_path, $certificate_password);
    $package_path = package_raw_data($package_dir);

    return $package_path;
}


// MAIN
$package_path = create_push_package();
if (empty($package_path)) {
    http_response_code(500);
    die;
}

header("Content-type: application/zip");
echo file_get_contents($package_path);
die;
