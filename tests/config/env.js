require('dotenv').config();

module.exports = {
  demoPageUrl: process.env.demo_Page_Url || 'https://www.jotform.com/widgets/signature',
  demoBtnSelector: process.env.demo_Btn_Selector || 'text=Demo',
  emptyErrorMessage: process.env.empty_Error_Message || "This field is required.",
  errorLocator: process.env.error_Locator || "div[role='alert'] span[class='error-navigation-message']",
  invalidEmailMessage: process.env.invalid_Email_Message || "Enter a valid e-mail address",
  successMessageSelector: process.env.success_Message_Selector || "div[class='form-all'] div h1"
  
};