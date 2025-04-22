# Stripe Test Cards 

Use these cards for testing in the test mode. Use any future expiration, any 3-digit CVC (or 4-digit for Amex), and any ZIP.

**🛠 Dev Tip:**
If you're just testing integration and not focused on Indian compliance yet, the easiest way is to create a test-only Stripe account set to US. 

## ✅ Basic Successful Payment

| Card Number |	Description |
|-|-|
| `4242 4242 4242 4242` | Visa — Always succeeds |
| `4000 0566 5566 5556` | Visa — 3D Secure required |
| `5555 5555 5555 4444` | MasterCard |
| `4000 0027 6000 3184` | Indian card that requires 3D Secure |
| `3782 822463 10005` | American Express |
| `6011 1111 1111 1117` | Discover |

## ⚠️ Cards that trigger authentication (3D Secure)

| Card Number |	Description |
|-|-|
| `4000 0027 6000 3184` |	Requires authentication (3DS) |
| `4000 0000 0000 3063` |	Authentication succeeds |
| `4000 0000 0000 3220` |	Authentication fails |

## ❌ Cards that fail payments
| Card Number |	Reason |
|-|-|
| `4000 0000 0000 9995` |	Card declined |
| `4000 0000 0000 9987` |	Insufficient funds |
| `4000 0000 0000 0069` |	Expired card |
| `4000 0000 0000 0002` |	Generic decline |

## 🧪 International & other test cases 

| Card Number |	Description |
|-|-|
| `4000 0000 0000 0077` |	Charge succeeds, but address ZIP check fails |
| `4000 0000 0000 0101` |	Charge succeeds, but CVC check fails |
| `5200 8282 8282 8210` |	Debit card (Mastercard) |


## 🛂 Address / CVC checks

Stripe lets you test address and CVC matching. You can send:

- `CVC`: **"123"** (match), or **"999"** (fail)
- `ZIP`: **"12345"** (match), or **"00000"** (fail)
