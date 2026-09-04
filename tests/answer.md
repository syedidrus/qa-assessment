# Question 1

## Issue 1 - Generic input locator

### Problem
The test uses `input[type="text"]` which is too generic

### Risk
The locator is not specified clearly and may match other or multiple text input field

### Fix
Use a specific locator such as `getByLabel()`

## Issue 2 Generic button locator

### Problem
The test uses `page.locator('button').click()` which does not contain the button name

### Risk
The button name is not specified may cause error or may cause test to click other button

### Fix
Use a specified button name which is `page.getByRole('button', { name: 'Submit' })`

## Issue 3 - No message verification

### Problem
The test uses `await expect(successMessage).toBeVisible();`

### Risk
The test does not specify the message, only checks if there is message or not

### Fix
The test should include specific message by using this:
`await expect(successs-message).toHaveText('Form Submitted')`

### Issue 4 - Hardcoded URL

### Problem
The test uses hardcoded URL

### Risk
It may be difficult to maintain

### Fix
Recommended to use baseURL in the playwright config
