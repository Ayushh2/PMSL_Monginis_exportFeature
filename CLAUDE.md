Read these files:
- client/src/components/DownloadBrochure.tsx
- client/src/locales/en.json
- client/src/locales/ar.json
- client/src/locales/fr.json

Make these specific changes:

1. In en.json:
   - Change: "placeholderPhoneNumber": "10-digit number"
   - To: "placeholderPhoneNumber": "Enter phone number"
   - Change label key "brochure.phone" or wherever phone label is defined:
   - Find any key that shows "10-DIGIT NUMBER" or "Phone Number" as label
   - Change to: "phone": "Phone Number"
   - Change: "placeholderEmail": "Business Email"
   - To: "placeholderEmail": "Email"
   - Find the label key for email field (shown as "BUSINESS EMAIL")
   - Change to just: "Email"

2. In ar.json - make same label changes in Arabic:
   - Email label → just "البريد الإلكتروني" (remove "Business/العمل")
   - Phone label → "رقم الهاتف"
   - Phone placeholder → "أدخل رقم الهاتف"

3. In fr.json - make same label changes in French:
   - Email label → just "Email"  
   - Phone label → "Numéro de téléphone"
   - Phone placeholder → "Entrez le numéro de téléphone"

4. In DownloadBrochure.tsx:
   - Find the phone label text - if it is hardcoded as "10-DIGIT NUMBER" or similar, change to use t("brochure.phone") translation key
   - Find the email label text - if hardcoded as "BUSINESS EMAIL", change to use t("brochure.email") or t("brochure.placeholderEmail") 
   - Find phone input placeholder - make sure it uses t("brochure.placeholderPhoneNumber")
   - Find email input placeholder - make sure it uses t("brochure.placeholderEmail")
   - Do NOT change any form logic, validation, or other functionality

Keep ALL existing functionality intact.
Only change label text and placeholder text as specified above.
pleaseeee use ur brain tooo to make it look attractivw