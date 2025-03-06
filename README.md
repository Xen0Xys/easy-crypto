# Easy Crypto

Easy Crypto is a TypeScript cryptography library designed to prevent misuse while providing a simple and secure interface for WebCrypto, hashing functions, and JWT usage.

## Features

- **Simple API:** Offers a straightforward interface to handle cryptographic operations.
- **AES-GCM Support:** Provides implementations for AES-GCM for secure symmetric encryption.
- **Hashing Functions:** Includes implementations for robust hash functions such as SHA-256 and Argon2.
- **JWT Integration:** Facilitates the generation and verification of JSON Web Tokens.
- **Type Safety:** Built entirely in TypeScript to ensure a robust developer experience and reduce runtime errors.

## Installation

To use Easy Crypto in your project, ensure you have Node.js installed. You can then install the library via your package manager if it’s published, or build it from source.

Clone this repository:

git clone <repository-url>

Install the dependencies:

npm install

## Usage

After installation or building the project, you can import and use the various modules in your TypeScript code. For instance:

```typescript
// Importing the AES-GCM cipher implementation
import { encrypt, decrypt } from './src/ciphers/aes-gcm';

// Encrypting data
const cipherText = encrypt(plainText, key);

// Decrypting data
const plainText = decrypt(cipherText, key);
```

Similarly, you can use the hashing functions:

```typescript
// Import a hash function
import { sha256 } from './src/hashes/hashes';

const digest = sha256(data);
```

Adapt the examples as needed to fit your application's requirements.

## Build & Test

Easy Crypto uses modern JavaScript tooling. Key scripts defined in the project include:

- **Build:**  
  Build and bundle the project for browser environment:

      bun build --minify --target=browser ./src/index.ts --outfile=dist/index.js
      bun run build:declaration

- **Lint:**  
  Automatically fix lint issues:

      eslint --fix .

- **Test:**  
  Run the test suite with Bun:

      bun test

These scripts ensure that the library is production-ready and free from common issues.

## Contributing

Contributions to Easy Crypto are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and ensure all tests pass.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

--------------------------------------------------
Easy Crypto is maintained by Tom Czekaj (a.k.a. Xen0Xys). For questions or suggestions, please open an issue on the repository or contact the maintainer.

--------------------------------------------------
