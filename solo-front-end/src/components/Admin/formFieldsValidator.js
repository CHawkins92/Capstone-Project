export const validateTelephoneNumber = (telephoneNumber) => {
    var telephoneNumberRegEx = /^[0-9]*$/i;
    let isTelephoneNumberFormatValid =
      telephoneNumberRegEx.test(telephoneNumber);

    if (
      !telephoneNumber ||
      telephoneNumber.length !== 11 ||
      !isTelephoneNumberFormatValid
    ) {
      return false;
    } else {
      return true;
    }
  };