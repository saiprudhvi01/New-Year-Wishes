# Google Sheets Integration Setup Instructions

## Step 1: Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename the first sheet to "UserData"
4. Add headers in row 1: `Timestamp`, `Name`, `DOB`, `ZodiacSign`, `UserTimestamp`

## Step 2: Get Spreadsheet ID
1. In your Google Sheet URL, find the ID between `/d/` and `/edit`
2. Example: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
3. Copy the SPREADSHEET_ID: `1E3p9W0aCMGn5UWbTBNz_EbBIvbzR-qJRKKZTFgZbzD8`

## Step 3: Create Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Paste the code from `Google_Apps_Script_Code.txt`
4. Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
5. Save the project (Ctrl+S)

## Step 4: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app"
3. Description: "New Year 2026 Data Collection"
4. Execute as: "Me" 
5. Who has access: "Anyone"
6. Click "Deploy"
7. Authorize the permissions (Google account access)
8. Copy the Web app URL

## Step 5: Update Your JavaScript
1. Open `js/main.js`
2. Find line: `const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`
3. Replace with your actual Web app URL: `https://script.google.com/macros/s/AKfycbz3ROXtXJC1t9mFA5cU4K1kZGzu91QiYpteB9qxIDZf1vMmby6S38ZmJXtwem_ToABm/exec`
4. Save the file

## ✅ Setup Complete!
Your Google Sheets integration is now ready with:
- **Spreadsheet ID**: `1E3p9W0aCMGn5UWbTBNz_EbBIvbzR-qJRKKZTFgZbzD8`
- **Deployment ID**: `AKfycbx70XcHeyhqgAY28ivnQJdNfnppZSl150VJkDTA_a9wGfFi8dfvPILSHb2jj9ud9D62`
- **Web App URL**: `https://script.google.com/macros/s/AKfycbx70XcHeyhqgAY28ivnQJdNfnppZSl150VJkDTA_a9wGfFi8dfvPILSHb2jj9ud9D62/exec`

## Step 6: Test It
1. Open your HTML file
2. Enter name and DOB
3. Click START
4. Check your Google Sheet - data should appear!
5. Check browser console (F12) for success/error messages

## Data Collected
- **Timestamp**: When Apps Script received the data
- **Name**: User's name
- **DOB**: Date of birth
- **ZodiacSign**: Calculated zodiac sign
- **UserTimestamp**: When user submitted the form

## Privacy Note
- Data is stored in your Google Sheet only
- Users have no indication data is being saved
- You can view/export data anytime from Google Sheets
- Consider adding privacy policy to your site

## Troubleshooting
- **CORS errors**: Make sure Web app is deployed with "Anyone" access
- **Authorization errors**: Re-deploy the Web app and re-authorize
- **No data appearing**: Check browser console for error messages
- **Spreadsheet not found**: Verify the spreadsheet ID is correct
