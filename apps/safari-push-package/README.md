# Safari Push Package

This repository contains the code and resources required to generate a **Safari Push Package** for enabling Safari web notifications.

Please refer to the attached [document](./Safari%20Web%20Push%20Package.docx) for detailed step-by-step instructions.

---

## 📘 Instructions

1. Follow the steps outlined in the above document to generate the `.p12` and `_AES.p12` certificate files.  
  Place both files in the **root** directory of this application.

2. Update the `certificate_path` and `certificate_password` values inside the [`createPushPackage.php`](./pushPackage.raw/) file.

3. Modify the contents of the `website.json` file inside the **pushPackage.raw** folder to reflect your website’s configuration.

4. Place all required image assets with the **exact filenames** listed below inside the `pushPackage.raw/icon.iconset` directory.

5. Run the following command to generate the push package:

  ```bash
  php createPushPackage.php > pushPackage.zip
  ```

6. To verify the contents of your generated package, run:

  ```bash
  unzip -l pushPackage.zip
  ```

---

## 📂 Expected Folder Structure

Your generated push package must follow the exact structure below:

```
pushPackage/
├── icon.iconset/
│   ├── icon_16x16.png
│   ├── icon_16x16@2x.png
│   ├── icon_32x32.png
│   ├── icon_32x32@2x.png
│   ├── icon_128x128.png
│   ├── icon_128x128@2x.png
│   ├── icon_256x256.png
│   ├── icon_256x256@2x.png
│   ├── icon_512x512.png
│   └── icon_512x512@2x.png
├── website.json
├── manifest.json
└── signature
```

---

## 🧩 Notes

- All icons **must be in PNG format** and **match the exact sizes** specified by their filenames.
- Ensure that `manifest.json` contains the correct SHA-1 hash map of all files.
- The `signature` file must be a valid detached **PKCS7 signature** of the `manifest.json` file.
- The `website.json` file defines your push configuration, including the identifier, URL, and authentication token.

---

**Author:** Nishant Kohli
**Purpose:** Safari Web Push Notification Package Generator
