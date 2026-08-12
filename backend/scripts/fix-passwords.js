/**
 * One-time script to bcrypt-hash plain-text passwords in the users table.
 * Run: node scripts/fix-passwords.js
 */
const bcrypt = require("bcryptjs");
const pool = require("../src/config/db");

const SEED_PASSWORDS = {
    "password123": [
        "aashray@example.com",
        "rahul@example.com",
        "krish@example.com",
        "dhruv@example.com",
        "mehul@example.com",
        "priya@example.com",
    ],
    "admin123": ["admin@hackarena.com"],
    "judge123": ["judge1@hackarena.com", "judge2@hackarena.com"],
};

async function fixPasswords() {
    try {
        for (const [plain, emails] of Object.entries(SEED_PASSWORDS)) {
            const hashed = await bcrypt.hash(plain, 10);

            for (const email of emails) {
                const [result] = await pool.query(
                    "UPDATE users SET password = ? WHERE email = ?",
                    [hashed, email]
                );

                if (result.affectedRows > 0) {
                    console.log(`Updated password for ${email}`);
                } else {
                    console.log(`Skipped ${email} (not found)`);
                }
            }
        }

        console.log("Done.");
        process.exit(0);
    } catch (error) {
        console.error("Failed:", error.message);
        process.exit(1);
    }
}

fixPasswords();
