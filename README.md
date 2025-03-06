# easy-crypto

A TypeScript cryptography library designed to prevent misuses and allow simple usage of WebCrypto, hashes, and JSON Web Tokens (JWT). Its goal is to provide developers with a straightforward and reliable way to handle common crypto tasks, such as AES-GCM encryption/decryption, Argon2 hashing, and JWT manipulation.

## Features

- Simple and intuitive API for AES-GCM encryption/decryption
- Argon2 support for secure password hashing
- JWT creation and verification
- Built on top of WebCrypto, ensuring modern, standards-based security
- Written in TypeScript for strong typing and better developer experience

## Installation

To install the library and its dependencies, run:

npm install argon2 jsonwebtoken uuid

This library is currently marked as private in package.json (for local or internal use). If needed, change the "private" field to false or remove it to publish to npm.

## Usage

Below is a quick reference on how you might use some of the features in easy-crypto:

### AES-GCM Encryption/Decryption
```ts
import {AesGcmSecret} from "easy-crypto";

const secret = "YourSecretKey";  
const aes = new AesGcmSecret(secret);

// Encrypt data  
const dataToEncrypt = new TextEncoder().encode("Hello World");  
const encrypted = await aes.cipher(dataToEncrypt);

// Decrypt data  
const decrypted = await aes.decipher(encrypted);  
console.log(new TextDecoder().decode(decrypted));  
```

### Argon2 Hashing
```ts
import {hashPassword, verifyPassword} from "easy-crypto";

const hash = await hashPassword("password");
const verify = await verifyPassword("password", hash);
console.log(verify); // true
```

### JWT Creation and Verification

```ts
import {signJwt} from "easy-crypto";

const jwt = signJwt({
    sub: "user_id",
}, "secret", "7d");
const payload = jwt.verify(token, "secret");
console.log(payload); // { sub: "user_id" }
```

## Scripts

The following scripts are available in the package.json [1]:

- build: Compiles and bundles the library for browser usage.
- test: Runs the test suite using Bun.
- lint:fix: Fixes lint issues using ESLint.

You can run them with:  
• npm run build  
• npm run test  
• npm run lint:fix

## License

This project is licensed under the MIT License [1].  
See the LICENSE file for details.

## Contributing

Feel free to open issues or feature requests in the repository. Contributions are welcome via pull requests. Before submitting code, please ensure you have tested and linted your changes.

## Security

- Dependencies are carefully managed to minimize security risks.
- Dev dependencies are only for local development; end users don’t install them.
- We recommend running tests and verifying the integrity of the code before using it in production.

---

Thank you for checking out easy-crypto! If you find this project helpful, feel free to contribute or share feedback.
