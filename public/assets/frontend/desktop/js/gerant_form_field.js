const base_URL = window.API_BASE_URL;
// console.log('base_URL' + base_URL);
async function GarantField(type, ContainerId, placeholder = "", url = null) {
  console.log("base_URL" + base_URL);
  try {
    let Data;
    // Fetch data only if url is provided
    if (url) {
      Data = await fetchData(url);

      if (url == "/age") {
        if (window.MEMBER_GENDER === "bride") {
          // Remove the first 3 elements from the Data array
          Data.splice(0, 3);
        }
      }
    } else {
      Data = []; // Example: set Data to an empty array or handle as needed
    }
    // Handle different types using switch case
    switch (type) {
      case "OnlySelect":
        handleSelectSearch(ContainerId, Data, placeholder);
        break;
      case "Select":
        handleSelect(ContainerId, Data, placeholder);
        break;
      case "SelectGroupId":
        handleSelectGroupId(ContainerId, Data, placeholder);
        break;
      case "SelectSerch":
        handleSelect(ContainerId, Data, placeholder);
        // handleSelectSearch(ContainerId, Data, placeholder);
        break;
      case "MultiSelect":
        handleMultiSelect(ContainerId, Data, placeholder);
        break;
      case "MultiSelectSearch":
        handleMultiSelectSearch(ContainerId, Data, placeholder);
        break;
      case "Mobile":
        // Handle other type 1
        // Example: handleType1(ContainerId, Data, placeholder);
        handlePhone(ContainerId);
        // console.log("Handling type 'otherType1'");
        break;
      case "Redio":
        // Handle other type 2
        // Example: handleType2(ContainerId, Data, placeholder);|
        handleRadio(ContainerId, Data);
        // console.log("Handling type 'otherType2'");
        break;
      case "Checkbox":
        // Handle other type 2
        // Example: handleType2(ContainerId, Data, placeholder);|
        handleCheckbox(ContainerId, Data);
        // console.log("Handling type 'otherType2'");
        break;
      case "DatePicker":
        // Handle other type 2
        // Example: handleType2(ContainerId, Data, placeholder);|
        handleDate(ContainerId);
        // handleDate(ContainerId);
        // console.log("Handling type 'otherType3'");
        break;
      case "TimePicker":
        // Handle other type 2
        // Example: handleType2(ContainerId, Data, placeholder);|
        handleTime(ContainerId);
        // handleDate(ContainerId);
        // console.log("Handling type 'otherType3'");
        break;
      default:
        console.warn(`Unknown type: ${type}`);
        break;
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

function fetchData(url) {
  // console.log(base_URL);
  return axios
    .get(base_URL + "/api/fetch" + url)
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to handle it in the caller function
    });
}

function handleRadio(ContainerId, Data) {
  const container = $(`#${ContainerId}`);
  if (!container.length) return;
  // Retrieve attributes from the container
  const SetName = container.attr("SetName");
  const SetValue = container.attr("SetValue");
  const SetID = container.attr("SetID");
  const SetContainerClass = container.attr("SetContainerClass");
  const SetRadioClass = container.attr("SetRadioClass");
  const SetlabelClass = container.attr("SetlabelClass");
  const SetAttr = container.attr("SetAttr");
  // Check if required attributes are defined
  if (!SetName || !SetID) {
    console.error("Missing required attributes: SetName or SetID");
    return;
  }
  // Clear any existing radio buttons
  container.empty();
  // Iterate over the Data array to create each radio button
  Data.forEach((item) => {
    // Determine if this radio button should be checked
    const isChecked = item.id + "" == SetValue ? "checked" : "";
    // Append the radio button to the container
    container.append(`
            <label class="${SetContainerClass}" for="${SetID + item.id}">
                <div>
                    <input class=" hide_Redio  ${SetRadioClass} ${
      isChecked ? "redio_check" : ""
    } "   
                        ${SetAttr} 
                        type="radio" 
                        name="${SetName}" 
                        id="${SetID + item.id}" 
                        value="${item.id}" 
                        ${isChecked}>
                    <label class="${SetlabelClass}" for="${SetID + item.id}">${
      item.name
    }</label>
                </div>
            </label>
        `);
    // If checked, change the background color of the parent label
    if (isChecked) {
      $(`#${SetID + item.id}`)
        .closest("label")
        .addClass("redio_check_label_css"); // Set desired color
    }
  });
  // Add event listener to handle when a radio button is clicked
  container.find(`input[name="${SetName}"]`).on("change", function () {
    // Remove the 'redio_check' class and reset background color for all radio buttons
    container
      .find(`.${SetRadioClass}`)
      .removeClass("redio_check")
      .closest("label")
      .removeClass("redio_check_label_css");
    // Add the 'redio_check' class and change the background color for the selected radio button
    if ($(this).is(":checked")) {
      $(this).addClass("redio_check");
      $(this).closest("label").addClass("redio_check_label_css"); // Set desired color
    }
  });
}

function handleCheckbox(ContainerId, Data) {
  const container = $(`#${ContainerId}`);
  if (!container.length) return;
  // Retrieve attributes from the container
  const SetName = container.attr("SetName");
  const SetValue = container.attr("SetValue").split(","); // Assuming multiple values can be comma-separated
  const SetID = container.attr("SetID");
  const SetContainerClass = container.attr("SetContainerClass");
  const SetCheckboxClass = container.attr("SetCheckboxClass");
  const SetLabelClass = container.attr("SetLabelClass");
  const SetAttr = container.attr("SetAttr");
  // // console.log(SetValue);
  let parsedArray = JSON.parse(SetValue);
  // console.log(parsedArray);
  // alert("this is SetValue :" + typeof(parsedArray));
  // Check if required attributes are defined
  if (!SetName || !SetID) {
    console.error("Missing required attributes: SetName or SetID");
    return;
  }
  // Clear any existing checkboxes
  container.empty();
  // Iterate over the Data array to create each checkbox
  Data.forEach((item) => {
    // Determine if this checkbox should be checked
    let isChecked = parsedArray.includes(item.id.toString()) ? "checked" : "";
    if (isChecked === "") {
      isChecked = parsedArray.includes(" " + item.id.toString())
        ? "checked"
        : "";
    }
    // Append the checkbox to the container
    container.append(`
            <label  class="${SetContainerClass}"  for="${SetID + item.id}">
                <div >
                    <input class="${SetCheckboxClass}" ${SetAttr} type="checkbox" name="${SetName}" id="${
      SetID + item.id
    }" value="${item.id}" ${isChecked}>
                    <label class="${SetLabelClass}" for="${SetID + item.id}">
                        ${item.name}
                    </label>
                </div>
            </label>
        `);
  });
}

function handleTime(ContainerId) {
  const container = $(`#${ContainerId}`);
  const SetName = container.attr("SetName");
  const SetValue = container.attr("SetValue");
  createTimePicker(ContainerId, SetName, SetValue);
}

function handleDate(ContainerId) {
  const container = $(`#${ContainerId}`);
  // Retrieve the existing class from the select element
  const SetName = container.attr("SetName");
  const DateType = container.attr("DateType");
  const SetValue = container.attr("SetValue");
  initializeDropdownDatePicker(ContainerId, SetName, SetValue);
}

function handlePhone(ContainerId) {
  createPhoneInputField(ContainerId, [
    "in",
    "us",
    "ke",
    "gb",
    "ca",
    "tz",
    "ug",
    "np",
    "za",
    "bn",
    "my",
    "jp",
  ]);
}

// function createPhoneInputField(ContainerId, preferredCountries) {
//     const container = $(`#${ContainerId}`);
//     if (!container.length) return;
//     // Retrieve attributes
//     const SetName = container.attr('SetName');
//     const SetPlaceholder = container.attr('SetPlaceholder');
//     const SetClass = container.attr('SetClass');
//     const SetValue = container.attr('SetValue');
//     // const SetCountryCode = container.attr('SetCountryCode');
//     // Ensure unique ID for the input field
//     const inputId = `${ContainerId}_input`;
//     const hiddenInputId = `${ContainerId}_countryCode`;
//     // Append the container for phone input and hidden input for country code
//     container.append(`
//         <input type="tel" class="${SetClass}" name="${SetName}" id="${inputId}" aria-describedby="mobile_help"
//             placeholder="${SetPlaceholder}">
//         <input type="hidden" id="${hiddenInputId}" name="${SetName}_countryCode">
//     `);
//     // Set the default number if provided
//     const inputElement = document.getElementById(inputId);
//     const hiddenInputElement = document.getElementById(hiddenInputId);
//     // Initialize intlTelInput plugin
//     const iti = window.intlTelInput(inputElement, {
//         initialCountry: "in", // Set India as the default country
//         separateDialCode: true, // Display separate dial code
//         preferredCountries: preferredCountries, // Preferred countries to display at the top of the dropdown
//         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // Path to utils.js file
//     });

//     console.log(iti);
//     // If SetValue is provided, set the number and update the country code
//     if (SetValue) {
//         iti.setNumber(SetValue);
//         console.log(iti);

//         hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     } else {
//         // Set the hidden input's value with the initial country code
//         hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     }
//     // Update the hidden input whenever the country changes
//     inputElement.addEventListener('countrychange', function() {
//         hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     });

//     // Remove spaces from the input value
//     const mobileInputValue = inputId.val().replace(/\s/g, '');
//     inputId.val(mobileInputValue);

//     // Add an event listener for the 'change' event
//     document.querySelector('input[name="mobile"]').addEventListener('input', function() {
//         // Remove all spaces from the input value
//         this.value = this.value.replace(/\s/g, '');
//         console.log(this.value);

//     });

//     // // If SetValue is provided, update the input and trigger the change event
//     // if (SetValue) {
//     //     alert('this work')
//     //     $('#Container_Mobile_input').change();

//     //     const mobileInput = document.querySelector('input[name="mobile"]');
//     //     mobileInput.value = mobileInput.value.replace(/\s/g, '');
//     //     // Manually trigger the change event after setting the value
//     //     const event = new Event('change');
//     //     mobileInput.dispatchEvent(event);
//     // }

//     // if (SetValue) {
//     //     // Set the phone number without spaces
//     //     iti.setNumber(SetValue.replace(/\s/g, ''));
//     //     console.log(iti);

//     //     hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     // } else {
//     //     // Set the hidden input's value with the initial country code
//     //     hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     // }

//     // // Update the hidden input whenever the country changes
//     // inputElement.addEventListener('countrychange', function() {
//     //     hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     // });

//     console.log($('#Container_Mobile_input').val());

//     inputElement.addEventListener('Container_Mobile_countryCode', function() {

//         console.log('Working');
//         hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//         validateLength(); // Validate on country change
//     });

// }

// // Validate the phone number length based on country code
// function validateLength() {
//     const errorMessage = document.getElementById('error-message');
//     const successMessage = document.getElementById('success-message');

//     const selectedCountryData = iti.getSelectedCountryData();
//     const countryCode = selectedCountryData.iso2; // Get the country code
//     const phoneNumber = inputElement.value.replace(/\s/g, ''); // Remove spaces

//     // Get the phone number type using intlTelInput
//     const numberType = iti.getNumberType();
//     const lengths = iti.getSelectedCountryData().nationalLength; // This gets the lengths array

//     const minLength = lengths ? Math.min(...lengths) : 0;
//     const maxLength = lengths ? Math.max(...lengths) : Infinity;

//     if (!phoneNumber.trim()) {
//         errorMessage.innerText = "Required";
//         successMessage.innerText = "";
//     } else if (phoneNumber.length < minLength) {
//         errorMessage.innerText = `Phone number must be at least ${minLength} digits long for ${selectedCountryData.name}.`;
//         successMessage.innerText = "";
//     } else if (phoneNumber.length > maxLength) {
//         errorMessage.innerText = `Phone number must be no more than ${maxLength} digits long for ${selectedCountryData.name}.`;
//         successMessage.innerText = "";
//     } else if (iti.isValidNumber()) {
//         errorMessage.innerText = "";
//         successMessage.innerText = "Valid number";
//     } else {
//         const errorCode = iti.getValidationError();
//         const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
//         const msg = errorMap[errorCode] || "Invalid number";
//         errorMessage.innerText = msg;
//         successMessage.innerText = "";
//     }
// }

// function createPhoneInputField(ContainerId, preferredCountries) {
//     const container = $(`#${ContainerId}`);
//     if (!container.length) return;

//     // Retrieve attributes
//     const SetName = container.attr('SetName');
//     const SetPlaceholder = container.attr('SetPlaceholder');
//     const SetClass = container.attr('SetClass');
//     const SetValue = container.attr('SetValue');

//     // Ensure unique ID for the input field
//     const inputId = `${ContainerId}_input`;
//     const hiddenInputId = `${ContainerId}_countryCode`;

//     // Append the container for phone input and hidden input for country code
//     container.append(`
//         <input type="tel" class="${SetClass}" name="${SetName}" id="${inputId}" aria-describedby="mobile_help"
//             placeholder="${SetPlaceholder}">
//         <input type="hidden" id="${hiddenInputId}" name="${SetName}_countryCode">
//     `);

//     // Set the default number if provided
//     const inputElement = document.getElementById(inputId);
//     const hiddenInputElement = document.getElementById(hiddenInputId);

//     // Initialize intlTelInput plugin
//     const iti = window.intlTelInput(inputElement, {
//         initialCountry: "in", // Set India as the default country
//         separateDialCode: true, // Display separate dial code
//         preferredCountries: preferredCountries, // Preferred countries to display at the top of the dropdown
//         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // Path to utils.js file
//     });

//     // If SetValue is provided, set the number and update the country code
//     if (SetValue) {
//         iti.setNumber(SetValue);
//         hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     } else {
//         // Set the hidden input's value with the initial country code
//         hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//     }

//     // Update the hidden input whenever the country changes
//     inputElement.addEventListener('countrychange', function() {
//         hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
//         validateLength(iti, inputElement); // Validate on country change
//     });

//     // Add an event listener for input changes
//     inputElement.addEventListener('input', function() {
//         // Remove spaces from the input value
//         this.value = this.value.replace(/\s/g, '');
//         validateLength(iti, inputElement); // Validate on input
//     });
// }

// // Validate the phone number length based on country code
// function validateLength(iti, inputElement) {
//     const messageElement = document.getElementById('mobile_error'); // Use a single message element

//     const selectedCountryData = iti.getSelectedCountryData();
//     const phoneNumber = inputElement.value.replace(/\s/g, ''); // Remove spaces

//     // Get the phone number lengths for the selected country
//     const lengths = selectedCountryData.nationalLength; // This gets the lengths array

//     // Validate lengths
//     if (lengths && Array.isArray(lengths)) {
//         const minLength = Math.min(...lengths);
//         const maxLength = Math.max(...lengths);

//         // Validate the phone number
//         if (!phoneNumber.trim()) {
//             messageElement.innerText = "Required";
//             messageElement.style.color = "red"; // Set color for error
//         } else if (phoneNumber.length < minLength) {
//             messageElement.innerText = `Phone number must be at least ${minLength} digits long for ${selectedCountryData.name}.`;
//             messageElement.style.color = "red"; // Set color for error
//         } else if (phoneNumber.length > maxLength) {
//             messageElement.innerText = `Phone number must be no more than ${maxLength} digits long for ${selectedCountryData.name}.`;
//             messageElement.style.color = "red"; // Set color for error
//         } else if (iti.isValidNumber()) {
//             messageElement.innerText = "Valid number";
//             messageElement.style.color = "green"; // Set color for success
//         } else {
//             const errorCode = iti.getValidationError();
//             const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
//             const msg = errorMap[errorCode] || "Invalid number";
//             messageElement.innerText = msg;
//             messageElement.style.color = "red"; // Set color for error
//         }
//     } else {
//         // Handle cases where lengths may not be available
//         messageElement.innerText = "Length information not available for this country.";
//         messageElement.style.color = "red"; // Set color for error
//     }
// }

function createPhoneInputField(ContainerId, preferredCountries) {
  const container = $(`#${ContainerId}`);
  if (!container.length) return;

  // Retrieve attributes
  const SetName = container.attr("SetName");
  const SetPlaceholder = container.attr("SetPlaceholder");
  const SetClass = container.attr("SetClass");
  const SetValue = container.attr("SetValue");

  // Ensure unique ID for the input field
  const inputId = `${ContainerId}_input`;
  const hiddenInputId = `${ContainerId}_countryCode`;

  // Append the container for phone input and hidden input for country code
  container.append(`
        <input type="tel" class="${SetClass}" name="${SetName}" id="${inputId}" aria-describedby="mobile_help"
            placeholder="${SetPlaceholder}">
        <input type="hidden" id="${hiddenInputId}" name="${SetName}_countryCode">
    `);

  // Set the default number if provided
  const inputElement = document.getElementById(inputId);
  const hiddenInputElement = document.getElementById(hiddenInputId);

  // Initialize intlTelInput plugin
  const iti = window.intlTelInput(inputElement, {
    initialCountry: "in", // Set India as the default country
    separateDialCode: true, // Display separate dial code
    preferredCountries: preferredCountries, // Preferred countries to display at the top of the dropdown
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Path to utils.js file
  });

  // If SetValue is provided, set the number and update the country code
  if (SetValue) {
    iti.setNumber(SetValue);
    hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
  } else {
    hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
  }

  // Update the hidden input whenever the country changes
  inputElement.addEventListener("countrychange", function () {
    hiddenInputElement.value = iti.getSelectedCountryData().dialCode;
    validateLength(iti, inputElement, SetName); // Validate on country change
  });

  // Add an event listener for input changes
  inputElement.addEventListener("focusout", function () {
    // Remove spaces from the input value
    this.value = this.value.replace(/\s/g, "");
    validateLength(iti, inputElement, SetName); // Validate on input
  });
}

// Static array to store country codes and corresponding phone number length ranges
const countryPhoneLengths = {
  IN: { min: 10, max: 10 }, // India
  US: { min: 10, max: 10 }, // United States
  KE: { min: 9, max: 9 }, // Kenya
  GB: { min: 10, max: 11 }, // United Kingdom
  CA: { min: 10, max: 10 }, // Canada
  TZ: { min: 9, max: 9 }, // Tanzania
  UG: { min: 9, max: 9 }, // Uganda
  NP: { min: 10, max: 10 }, // Nepal
  ZA: { min: 9, max: 10 }, // South Africa
  BN: { min: 7, max: 7 }, // Brunei
  MY: { min: 9, max: 11 }, // Malaysia
  JP: { min: 10, max: 11 }, // Japan
};

// Validate the phone number length based on country code
function validateLength(iti, inputElement, SetName) {
  const messageElement = document.getElementById(SetName + "_error"); // Use a single message element

  // Check if messageElement is null
  if (!messageElement) {
    console.error("Message element not found.");
    return; // Exit the function if the element does not exist
  }

  const selectedCountryData = iti.getSelectedCountryData();
  const phoneNumber = inputElement.value.replace(/\s/g, ""); // Remove spaces
  const countryCode = selectedCountryData.iso2.toUpperCase(); // Get the country code in uppercase

  console.log("Selected Country Code:", countryCode); // Debugging output
  console.log("Phone number:", phoneNumber); // Debugging output

  // Get the phone number length range from the static array
  const lengthData = countryPhoneLengths[countryCode] || {
    min: 5,
    max: 15,
    empty: true,
  };

  console.log(lengthData);
  // Log the length data for debugging
  console.log("Phone length data:", lengthData);

  if (lengthData) {
    const minLength = lengthData.min;
    const maxLength = lengthData.max;

    // Validate the phone number
    if (!phoneNumber.trim()) {
      messageElement.innerText = "Required";
      messageElement.style.color = "red"; // Set color for error
    } else if (phoneNumber.length < minLength) {
      // If empty is true, show a generic message
      if (lengthData.empty) {
        messageElement.innerText = "Phone number is too short.";
      } else {
        messageElement.innerText = `Phone number must be at least ${minLength} digits long for ${selectedCountryData.name}.`;
      }
      messageElement.style.color = "red"; // Set color for error
    } else if (phoneNumber.length > maxLength) {
      // If empty is true, show a generic message
      if (lengthData.empty) {
        messageElement.innerText = "Phone number is too long.";
      } else {
        messageElement.innerText = `Phone number must be no more than ${maxLength} digits long for ${selectedCountryData.name}.`;
      }
      messageElement.style.color = "red"; // Set color for error
    } else if (iti.isValidNumber()) {
      messageElement.innerText = "";
      // messageElement.style.color = "green"; // Set color for success
    } else {
      // const errorCode = iti.getValidationError();
      // console.log(errorCode);
      // const errorMap = {
      //     0: "Invalid number", // INVALID_NUMBER
      //     1: "Invalid country code", // INVALID_COUNTRY_CODE
      //     2: "Phone number is too short", // TOO_SHORT
      //     3: "Phone number is too long", // TOO_LONG
      //     4: "Invalid number" // NOT_A_NUMBER
      // };
      // // Log the error code for debugging
      // console.log("Error code:", errorCode);
      // // Use the errorCode to get the appropriate message
      // const msg = errorMap[errorCode] || "Invalid number";
      // // Display the error message
      // messageElement.innerText = msg;
      // messageElement.style.color = "red"; // Set color for error
    }
  } else {
    // Handle cases where the country code does not exist in the static array
    messageElement.innerText =
      "Length information not available for this country.";
    messageElement.style.color = "red"; // Set color for error
  }
}

// // Validate the phone number length based on country code
// function validateLength(iti, inputElement) {
//     const messageElement = document.getElementById('mobile_error'); // Use a single message element

//     // Check if messageElement is null
//     if (!messageElement) {
//         console.error("Message element not found.");
//         return; // Exit the function if the element does not exist
//     }

//     const selectedCountryData = iti.getSelectedCountryData();
//     const phoneNumber = inputElement.value.replace(/\s/g, ''); // Remove spaces

//     console.log(selectedCountryData); // Debugging output
//     console.log("Phone number:", phoneNumber); // Debugging output

//     // Get the phone number lengths for the selected country
//     const lengths = selectedCountryData.nationalLength; // This gets the lengths array

//     // Log the lengths for debugging
//     console.log("National lengths:", lengths);

//     // Check if lengths is available
//     if (Array.isArray(lengths) && lengths.length > 0) {
//         const minLength = Math.min(...lengths);
//         const maxLength = Math.max(...lengths);

//         // Validate the phone number
//         if (!phoneNumber.trim()) {
//             messageElement.innerText = "Required";
//             messageElement.style.color = "red"; // Set color for error
//         } else if (phoneNumber.length < minLength) {
//             messageElement.innerText = `Phone number must be at least ${minLength} digits long for ${selectedCountryData.name}.`;
//             messageElement.style.color = "red"; // Set color for error
//         } else if (phoneNumber.length > maxLength) {
//             messageElement.innerText = `Phone number must be no more than ${maxLength} digits long for ${selectedCountryData.name}.`;
//             messageElement.style.color = "red"; // Set color for error
//         } else if (iti.isValidNumber()) {
//             messageElement.innerText = "Valid number";
//             messageElement.style.color = "green"; // Set color for success
//         } else {
//             const errorCode = iti.getValidationError();
//             const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
//             const msg = errorMap[errorCode] || "Invalid number";
//             messageElement.innerText = msg;
//             messageElement.style.color = "red"; // Set color for error
//         }
//     } else {
//         // Handle cases where lengths may not be available or invalid
//         messageElement.innerText = "Length information not available for this country.";
//         messageElement.style.color = "red"; // Set color for error
//     }
// }

// // Validate the phone number length based on country code
// function validateLength(iti, inputElement) {

//     console.log(iti);
//     const messageElement = document.getElementById('mobile_error'); // Use a single message element

//     // Check if messageElement is null
//     if (!messageElement) {
//         console.error("Message element not found.");
//         return; // Exit the function if the element does not exist
//     }

//     const selectedCountryData = iti.getSelectedCountryData();
//     console.log(selectedCountryData);
//     const phoneNumber = inputElement.value.replace(/\s/g, ''); // Remove spaces

//     // Get the phone number lengths for the selected country
//     const lengths = selectedCountryData.nationalLength; // This gets the lengths array

//     // Check if lengths is available
//     if (lengths && Array.isArray(lengths)) {
//         const minLength = Math.min(...lengths);
//         const maxLength = Math.max(...lengths);

//         // Validate the phone number
//         if (!phoneNumber.trim()) {
//             messageElement.innerText = "Required";
//             messageElement.style.color = "red"; // Set color for error
//         } else if (phoneNumber.length < minLength) {
//             messageElement.innerText = `Phone number must be at least ${minLength} digits long for ${selectedCountryData.name}.`;
//             messageElement.style.color = "red"; // Set color for error
//         } else if (phoneNumber.length > maxLength) {
//             messageElement.innerText = `Phone number must be no more than ${maxLength} digits long for ${selectedCountryData.name}.`;
//             messageElement.style.color = "red"; // Set color for error
//         } else if (iti.isValidNumber()) {
//             messageElement.innerText = "Valid number";
//             messageElement.style.color = "green"; // Set color for success
//         } else {
//             const errorCode = iti.getValidationError();
//             const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
//             const msg = errorMap[errorCode] || "Invalid number";
//             messageElement.innerText = msg;
//             messageElement.style.color = "red"; // Set color for error
//         }
//     } else {
//         // Handle cases where lengths may not be available
//         messageElement.innerText = "Length information not available for this country.";
//         messageElement.style.color = "red"; // Set color for error
//     }
// }

// // Example usage (make sure to call this function with valid attributes)
// $(document).ready(function() {
//     createPhoneInputField('Container_Mobile', ['us', 'in', 'uk']); // Example container ID and preferred countries
// });

// function createPhoneInputField(containerId, preferredCountries) {
//     const container = $(`#${containerId}`);
//     if (!container.length) return;

//     // Retrieve attributes for configuration
//     const setName = container.attr('SetName');
//     const setPlaceholder = container.attr('SetPlaceholder');
//     const setClass = container.attr('SetClass');

//     // Ensure unique IDs for input and hidden field
//     const inputId = `${containerId}_input`;
//     const hiddenInputId = `${containerId}_countryCode`;

//     // Append the input fields to the container
//     container.append(`
//         <input type="tel" class="${setClass}" name="${setName}" id="${inputId}" aria-describedby="mobile_help"
//             placeholder="${setPlaceholder}">
//         <input type="hidden" id="${hiddenInputId}" name="${setName}_countryCode">
//     `);

//     // Initialize intlTelInput plugin
//     const inputElement = document.getElementById(inputId);
//     const hiddenInputElement = document.getElementById(hiddenInputId);
//     const iti = window.intlTelInput(inputElement, {
//         initialCountry: "us", // Default country
//         separateDialCode: true, // Show separate dial code
//         preferredCountries: preferredCountries, // Preferred countries
//         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // Path to utils.js
//     });

// Update hidden input on country change

function handleSelect(ContainerId, Data, placeholder) {
  // // console.log("hello thise");
  const select = $(`#${ContainerId}`);
  if (!select.length) return;
  // Retrieve the existing class from the select element
  // const originalClass = select.attr('class');
  // const DropdownClass = select.attr('Dropdownclass');
  const SetValue = select.attr("SetValue");
  // const SetPlaceholder = select.attr('SetPlaceholder');
  // Clear existing options
  select.empty();
  // Add the placeholder option
  select.append(`<option selected disabled>${placeholder}</option>`);
  // Generate options from the Data array and determine the selected value
  const options = Data.map((item) => {
    const isSelected = item.id == SetValue ? "selected" : "";
    return `<option value="${item.id}" ${isSelected}>${item.name}</option>`;
  }).join("");
  select.append(options);
  // Add select2 class
  select.addClass("select2");
  // Initialize select2 with custom dropdown class, disabling the search
  select.select2({
    // dropdownCssClass: DropdownClass, // Use this option to set a custom class for the dropdown
    // minimumResultsForSearch: -1 // Disable the search box
  });
  // Add the original class to the select2 container
  // select.next('.select2-container').addClass(originalClass);
  // Remove default select2 styles if needed
  // RemoveSelect2DefaultStyle(ContainerId);
  select.change();
  // Attach onchange event for validation
  select.on("change", function () {
    $(this).valid(); // Validate the select element on change
  });
}

function handleSelectGroupId(ContainerId, Data, placeholder) {
  // // console.log("hello thise");
  const select = $(`#${ContainerId}`);
  if (!select.length) return;
  // Retrieve the existing class from the select element
  const originalClass = select.attr("class");
  const DropdownClass = select.attr("Dropdownclass");
  const SetValue = select.attr("SetValue");
  // Clear existing options
  select.empty();
  // Add the placeholder option
  select.append(`<option selected disabled>${placeholder}</option>`);
  // Generate options from the Data array and determine the selected value
  const options = Data.map((item) => {
    const isSelected = item.id == SetValue ? "selected" : "";
    return `<option value="${item.id}" setGroupId='${item.ForeignKey}' ${isSelected}>${item.name}</option>`;
  }).join("");
  select.append(options);
  // Add select2 class
  select.addClass("select2");
  // Initialize select2 with custom dropdown class, disabling the search
  select.select2({
    // dropdownCssClass: DropdownClass, // Use this option to set a custom class for the dropdown
    minimumResultsForSearch: -1, // Disable the search box
  });
  // Add the original class to the select2 container
  // select.next('.select2-container').addClass(originalClass);
  // Remove default select2 styles if needed
  // RemoveSelect2DefaultStyle(ContainerId);
  select.change();
  // Attach onchange event for validation
  select.on("change", function () {
    $(this).valid(); // Validate the select element on change
  });
}

function handleMultiSelect(ContainerId, Data, placeholder) {
  const select = $(`#${ContainerId}`);
  if (!select.length) return;
  // Retrieve the existing class from the select element
  const originalClass = select.attr("class");
  const DropdownClass = select.attr("Dropdownclass");
  const Setonchange = select.attr("Setonchange");
  // var SetValue = select.attr('SetValue') ? select.attr('SetValue').split(',') : [];
  select.attr("multiple", "multiple");
  // Clear existing options
  select.empty();
  // Add the placeholder option if needed
  // select.append(`<option value='' selected disabled>${placeholder}</option>`);
  // console.log('SetValue');
  let SetValue = select.attr("SetValue");
  try {
    SetValue = SetValue.split(","); // Assuming multiple values can be comma-separated
    SetValue = JSON.parse(SetValue);
    // selectedValue = JSON.parse(selectedValue.replace(/&quot;/g, '"'));
  } catch (e) {
    console.error("Error parsing JSON:", e);
    SetValue = null; // Handle parsing error gracefully
  }
  // console.log(SetValue);
  // alert(typeof(SetValue))
  // Generate options from the Data array and determine the selected values
  const options = Data.map((item) => {
    let isSelected = SetValue.includes(String(item.id)) ? "selected" : "";
    if (isSelected === "") {
      isSelected = SetValue.includes(" " + String(item.id)) ? "selected" : "";
    }
    return `<option value="${item.id}" ${isSelected}>${item.name}</option>`;
  }).join("");
  select.append(options);
  // Add select2 class and enable multi-select
  select.addClass("select2");
  // Initialize select2 with custom dropdown class, disabling the search
  select.select2({
    // dropdownCssClass: DropdownClass, // Use this option to set a custom class for the dropdown
    placeholder: placeholder,
    minimumResultsForSearch: -1, // Disable the search box
  });

  select.change();

  select.on("change", function () {
    callGarantField(this.value, this.id);
    $(this).valid(); // Validate the select element on change
  });
  // if (select.val()) {
  //     select.change();
  // }
  let value = select.val();
  console.log(value);

  if (value.length > 0) {
    select.change(); // Trigger the change event
    // Log the value to the console
    console.log(value);
  }
}

function getUniqueToArray2(array1, array2) {
  // Convert arrays to sets
  const set1 = new Set(array1);
  const set2 = new Set(array2);
  // Find elements in set2 that are not in set1
  const uniqueToSet2 = Array.from(set2).filter((item) => !set1.has(item));
  // Return the unique elements in array2
  return uniqueToSet2;
}

function handleSelectSearch(ContainerId, Data, placeholder) {
  const select = $(`#${ContainerId}`);
  if (!select.length) return;
  // Retrieve the existing class from the select element
  const originalClass = select.attr("class");
  const DropdownClass = select.attr("Dropdownclass");
  const SetValue = select.attr("SetValue");
  // const originalClass = '';
  // const DropdownClass = '';
  // const SetValue = '';
  // Clear existing options
  select.empty();
  // Add the placeholder option
  select.append(`<option selected disabled>${placeholder}</option>`);
  // Generate options from the Data array and determine the selected value
  const options = Data.map((item) => {
    const isSelected = item.id == SetValue ? "selected" : "";
    return `<option value="${item.id}" ${isSelected}>${item.name}</option>`;
  }).join("");
  select.append(options);
  // Add select2 class
  // select.addClass("select2");
  // if (!select.hasClass('select2')) {
  //     select.addClass("select2");
  // }
  // Initialize select2 with custom dropdown class
  // select.select2({
  //     dropdownCssClass: DropdownClass // Use this option to set a custom class for the dropdown
  // });
  // Add the original class to the select2 container
  // select.next('.select2-container').addClass(originalClass);
  // array1 = originalClass.split(' ');
  // array2 = select.next('.select2-container').attr('class').split(' ');
  // // console.log(array1);
  // // console.log(array2);
  // const UniqueClass = getUniqueToArray2(select.next('.select2-container').attr('class').split(' '), originalClass.split(' '));
  // // console.log(UniqueClass);
  // if (!select.next('.select2-container').hasClass(originalClass)) {
  //     alert("This is working ::" + select.next('.select2-container').hasClass(originalClass));
  // select.next('.select2-container').addClass(UniqueClass);
  // Remove 'select2-hidden-accessible' class from the next .select2-container element
  // select.next('.select2-container').removeClass('select2-hidden-accessible');
  // }
  //  ['form-select', 'form-select-lg', 'mb-3', 'select2', 'select2-hidden-accessible']
  //  ['select2', 'select2-container', 'select2-container--default']
  //  select2 select2-container select2-container--default form-select form-select-lg mb-3 select2-container--below select2-container--focus
  //  select2 select2-container select2-container--default form-select form-select-lg mb-3
  // if (!select.next('.'+originalClass)) {
  //     alert("This is working");
  //     select.next('.select2-container').addClass(originalClass);
  // }
  // Remove default select2 styles if needed
  // RemoveSelect2DefaultStyle(ContainerId);
  select.change();
  // Attach onchange event for validation
  select.on("change", function () {
    $(this).valid(); // Validate the select element on change
  });
}

function handleMultiSelectSearch(ContainerId, Data, placeholder) {
  const select = $(`#${ContainerId}`);
  if (!select.length) return;
  // Retrieve the existing class from the select element
  const originalClass = select.attr("class");
  const DropdownClass = select.attr("Dropdownclass");
  const SetValue = select.attr("SetValue")
    ? select.attr("SetValue").split(",")
    : []; // Assuming SetValue can contain comma-separated values
  // Clear existing options
  select.empty();
  // Add the placeholder option (if necessary)
  // if (placeholder) {
  //     select.append(`<option disabled>${placeholder}</option>`);
  // }
  // Add placeholder option
  // var placeholderOption = $('<option>', {
  //     value: '',
  //     text: 'Select',
  //     disabled: true,
  //     selected: true // Ensure placeholder is selected initially
  // });
  // select.append(placeholderOption);
  // Generate options from the Data array and determine the selected values
  const options = Data.map((item) => {
    // const isSelected = SetValue.includes(item.id.toString()) ? 'selected' : '';
    const isSelected = "";
    return `<option value="${item.id}" ${isSelected}>${item.name}</option>`;
  }).join("");
  select.append(options);
  // Ensure the select element is set to multiple
  select.attr("multiple", "multiple");
  // Add select2 class and initialize select2 with custom dropdown class
  if (!select.hasClass("select2")) {
    select.addClass("select2");
  }
  // select.select2({
  //     dropdownCssClass: DropdownClass, // Use this option to set a custom class for the dropdown
  //     placeholder: placeholder || '', // Set placeholder
  // });
  // Add the original class to the select2 container
  // const UniqueClass = getUniqueToArray2(select.next('.select2-container').attr('class').split(' '), originalClass.split(' '));
  // select.next('.select2-container').addClass(UniqueClass);
  // // Remove 'select2-hidden-accessible' class from the next .select2-container element
  // select.next('.select2-container').removeClass('select2-hidden-accessible');
  // // Remove default select2 styles if needed
  // RemoveSelect2DefaultStyle(ContainerId);
  select.change();
  // Attach onchange event for validation
  select.on("change", function () {
    $(this).valid(); // Validate the select element on change
  });
}

function createSingleOptgroupSelect(selectId, labels, options, selectedValue) {
  // alert('This is Single Optgroup Select');
  // console.log(selectedValue);
  var select = $(selectId);
  select.empty(); // Clear existing options
  select.attr("multiple", false); // Ensure it's a single select
  const SetPlaceholder = select.attr("SetPlaceholder");
  // Add placeholder option
  var placeholderOption = $("<option>", {
    value: "",
    text: SetPlaceholder,
    disabled: true,
    selected: true, // Ensure placeholder is selected initially
  });
  select.append(placeholderOption);
  // Iterate through labels to create optgroups
  labels.forEach(function (label) {
    var optgroup = $("<optgroup>", {
      label: label.name,
      "data-typeof": "optgroup",
    });
    // Filter options for current label
    var filteredOptions = options.filter(function (option) {
      return option.ForeignKey === label.id;
    });
    // Iterate through filtered options to create option elements
    filteredOptions.forEach(function (option) {
      var optionElement = $("<option>", {
        value: option.id,
        text: option.name,
      });
      // Check if option value matches selectedValue
      if ("" + selectedValue === "" + option.id) {
        optionElement.prop("selected", true);
      }
      optgroup.append(optionElement);
    });
    // Append optgroup to select
    select.append(optgroup);
  });
  // Initialize Select2 for single select
  select.select2({
    // placeholder: 'Select an option',
    allowClear: true,
    multiple: false,
    width: "resolve", // Make sure select2 fits the container width
  });
  // Optionally, set additional styles or classes if needed
  select.next(".select2-container").addClass("custom-class"); // Add your custom class here if needed
  // // Attach onchange event for validation
  // select.on('change', function() {
  //     if ($(this).val()) {
  //         let name = $(this).attr('name'); // To get the name attribute of the element
  //         $("#" + name + "_error").html("");
  //     }
  //     // $(this.name).valid(); // Validate the select element on change
  //     // console.log('Selected value:', $(this).val());
  // });
  select.change();
  // Attach onchange event for validation
  select.on("change", function () {
    $(this).valid(); // Validate the select element on change
  });
}

// Example usage with event delegation and dynamic select creation
function createOptgroupSelect(
  selectId,
  labels,
  options,
  type,
  selectedValues = []
) {
  // console.clear();
  // console.log(labels);
  // console.log(options);
  var select = $(selectId);
  select.empty(); // Clear existing options
  select.attr("multiple", "multiple");
  const SetPlaceholder = select.attr("SetPlaceholder");
  // Add placeholder option
  // var placeholderOption = $('<option>', {
  //     value: '',
  //     text: 'Select',
  //     disabled: true,
  //     selected: true // Ensure placeholder is selected initially
  // });
  // select.append(placeholderOption);
  // Iterate through labels to create optgroups
  labels.forEach(function (label) {
    var optgroup = $("<optgroup>", {
      label: label.name,
      "data-typeof": "optgroup",
    });
    // Filter options for current label
    var filteredOptions = options.filter(function (option) {
      return option.ForeignKey === label.id;
    });
    if (type === "search-multiple") {
      // Create "Select All" option
      var selectAllOption = $("<option>", {
        value: "select-all-" + label.id,
        text: "Select All",
        class: sanitizeClassName("" + selectId + label.name), // Assign class name for selection
        "data-class-name": sanitizeClassName("" + selectId + label.name), // Store class name for use in event handler
      });
      optgroup.append(selectAllOption);
    }
    // Iterate through filtered options to create option elements
    filteredOptions.forEach(function (option) {
      var optionElement = $("<option>", {
        value: option.id,
        class: sanitizeClassName("" + selectId + label.name), // Assign class name for grouping
        text: option.name,
      });
      // // Check if option value is in selectedValues array or equals selectedValues
      // if (Array.isArray(selectedValues)) {
      //     if (selectedValues.includes('' + option.id)) {
      //         optionElement.attr('selected', true);
      //     }
      // } else if ('' + selectedValues === '' + option.id) {
      //     optionElement.attr('selected', true);
      // }
      // selectedValues = trimArrayElements(selectedValues);
      // console.log(selectedValues);
      // Check if option value is in selectedValues array or equals selectedValues
      if (Array.isArray(selectedValues)) {
        // console.log(option.id + '');
        if (selectedValues.includes("" + option.id)) {
          optionElement.prop("selected", true);
        } else if (selectedValues.includes(" " + option.id)) {
          optionElement.prop("selected", true);
        }
      } else if ("" + selectedValues === "" + option.id) {
        optionElement.prop("selected", true);
      }
      optgroup.append(optionElement);
    });
    // Append optgroup to select
    select.append(optgroup);
  });
  // Initialize Select2 based on type parameter
  if (type === "search") {
    select.select2({
      // placeholder: 'Select an option',
      allowClear: true,
      multiple: false,
      // matcher: matchCustom,
    });
  } else if (type === "search-multiple") {
    select.select2({
      placeholder: SetPlaceholder,
      allowClear: true,
      // matcher: matchCustom,

      // multiple: true
    });
  }

  // THIS IS UPDATE SERCH IF WANT TO USE UN COMMENT THIS AND UPDATE {matchCustom} THIS FUNCTION AS NEEDED
  // if (type === 'search') {
  //     select.select2({
  //         placeholder: 'Select an option',
  //         allowClear: true,
  //         multiple: false, // Single selection
  //         matcher: matchCustom,
  //     });
  // } else if (type === 'search-multiple') {
  //     select.select2({
  //         placeholder: SetPlaceholder,
  //         allowClear: true,
  //         multiple: true, // Multiple selection enabled
  //         matcher: matchCustom,
  //     });
  // }

  // const DropdownClass = select.attr('Dropdownclass');
  // const originalClass = select.attr('class');
  // Initialize select2 with custom dropdown class, disabling the search
  // select.select2({
  //     dropdownCssClass: DropdownClass, // Use this option to set a custom class for the dropdown
  //     minimumResultsForSearch: -1, // Disable the search box
  //     width: 'resolve' // Make sure select2 fits the container width
  // });
  // Add the original class to the select2 container
  // select.next('.select2-container').addClass(originalClass);
  // Remove default select2 styles if needed
  // RemoveSelect2DefaultStyle(ContainerId);
  // // Attach onchange event for validation
  // select.on('change', function() {
  //     $(this).valid(); // Validate the select element on change
  //     // console.log('Selected value:', $(this).val());
  // });
  select.change();
  // // Attach onchange event for validation
  // select.on('change', function() {
  //     $(this).valid(); // Validate the select element on change
  //     // Attach change event handler to the select element using event delegation
  //     handleSelectChange(this);
  // });
  // Attach change event handler to the select element using event delegation
  select.on("change", handleSelectChange);
  // // Attach change event handler for validation and selection handling
  // select.on('change', function() {
  //     $(this).valid(); // Validate the select element on change
  //     handleSelectChange(); // Handle the "Select All" functionality
  //     $(this).attr('SetValue', $(this).val());
  // });
  // select.removeAttribute("SetValue");
  // dropdown.dispatchEvent(new Event('change'));
  // callGarantField(select.val(), selectId);
  // Get the value of the select element
  let value = select.val();
  // // Check if the value matches a specific condition
  // if (value && value !== '[]') {
  //     select.change(); // Trigger the change event
  //     // alert("This is running");
  //     console.log(value); // Log the value to the console
  // }
  if (value.length > 0) {
    select.change(); // Trigger the change event
    // Log the value to the console
    console.log(value);
  }
  // Get the name attribute of the select element
  // var fieldName = select.attr('name');
  // // Check if the name ends with '[]' and remove it if necessary
  // if (fieldName.endsWith('[]')) {
  //     fieldName = fieldName.slice(0, -2); // Remove '[]' from the end
  // }
}

function handleSelectGroupSearchMultiple(
  formContainerId,
  fieldData,
  ContainerId
) {
  const container = $(`#${ContainerId}`);
  if (!container.length) return;
  // container.append(`
  //     <div class="form-group">
  //         <label for="${fieldData.field_name}">${fieldData.field_name}:</label>
  //         <select class="form-control select2-multiple" id="${fieldData.field_name}" name="${fieldData.field_name}" multiple required>
  //             <optgroup label="Group 1">
  //                 <option value="group1_option1">Group 1 - Option 1</option>
  //                 <option value="group1_option2">Group 1 - Option 2</option>
  //             </optgroup>
  //             <optgroup label="Group 2">
  //                 <option value="group2_option1">Group 2 - Option 1</option>
  //                 <option value="group2_option2">Group 2 - Option 2</option>
  //             </optgroup>
  //         </select>
  //         <div class="invalid-feedback"></div>
  //     </div>
  // `);
  container.append(`
            <div class="form-group">
                <label for="${fieldData.field_name}">${fieldData.field_name}:</label>
                <select class="form-control select2" id="${fieldData.field_name}" name="${fieldData.field_name}[]" multiple required>
                    <optgroup label="Group 1">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </optgroup>
                    <optgroup label="Group 2">
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </optgroup>
                </select>
                <div class="invalid-feedback"></div>
            </div>
        `);
  $(`#${fieldData.field_name}`).select2();
}
// function handlePhone(formContainerId, fieldData, ContainerId) {
//     createPhoneInputField(formContainerId, fieldData.field_name, ['us', 'gb', 'ca']);
// }
function RemoveSelect2DefaultStyle(ContainerId) {
  // // Find the select2 container element
  // const container = $(`#${ContainerId}`).next('.select2-container');
  // // Check if the container exists
  // if (!container.length) return;
  // // Apply custom styles to the select2 selection element
  // container.find('.select2-selection').css({
  //     'border': 'none', // Remove default border
  //     'background': 'none', // Remove default background
  //     'box-shadow': 'none' // Remove default box-shadow
  // });
  // // Apply custom styles to the select2 dropdown element
  // container.find('.select2-dropdown').css({
  //     'background-color': '#ffffff', // Set background color
  //     'border': 'none', // Remove default border
  //     'box-shadow': 'none' // Remove default box-shadow
  // });
  // container.find('.select2-selection__arrow').css({
  //     'display': 'none',
  //     'background-color': '#ffffff', // Set background color
  //     'border': 'none', // Remove default border
  //     'box-shadow': 'none' // Remove default box-shadow
  // });
  // // Optionally, apply custom styles to the dropdown results element
  // container.find('.select2-results').css({
  //     'background-color': '#ffffff', // Set background color
  //     'border': 'none', // Remove default border
  //     'box-shadow': 'none' // Remove default box-shadow
  // });
  // container.find('.select2-container--default').css({
  //     'border': 'none', // Remove default border
  // });
  // container.find('.select2-selection--single').css({
  //     'border': 'none', // Remove default border
  // })
  // container.find('select2-selection__rendered').css({
  //     'padding-left': '0', // Remove default border
  //     'padding-right': '0', // Remove default border
  // })
}

function RemoveSelect2HiddenClass(ContainerId) {
  const container = $(`#${ContainerId}`).next(".select2-container");
  container
    .find(".select2-hidden-accessible")
    .removeClass("select2-hidden-accessible");
}

function populateGroupDropdown(dropdownId, labelsurl, optionsurl, type) {
  const baseURL = window.API_BASE_URL + "/api/fetch";
  // console.log(`${baseURL}/groupId/${optionsurl}`);
  axios
    .get(`${baseURL}/${labelsurl}`)
    .then(function (response) {
      const labels = response.data;
      return axios
        .get(`${baseURL}/groupId/${optionsurl}`)
        .then(function (response) {
          const options = response.data;
          var dropdown = document.querySelector(dropdownId);
          var selectedValue = dropdown.getAttribute("SetValue");
          if (type === "search-multiple") {
            try {
              selectedValue = selectedValue.split(","); // Assuming multiple values can be comma-separated
              selectedValue = JSON.parse(selectedValue);
              // selectedValue = JSON.parse(selectedValue.replace(/&quot;/g, '"'));
            } catch (e) {
              console.error("Error parsing JSON:", e);
              selectedValue = null; // Handle parsing error gracefully
            }
          }
          // console.log(selectedValue);
          // alert('here => ');
          if (type === "search-multiple") {
            createOptgroupSelect(
              dropdownId,
              labels,
              options,
              type,
              selectedValue
            );
          } else if (type === "search") {
            createSingleOptgroupSelect(
              dropdownId,
              labels,
              options,
              selectedValue
            );
          }
        });
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function addOnChangeEventforgroup(dropdownId, labelsurl, optionsurl, ThisID) {
  // Ensure selectedValues is an array
  // console.clear();
  var selectedValues = $(ThisID).val();
  // var selectedValues = ;
  console.log(selectedValues);
  selectedValues = Array.isArray(selectedValues)
    ? selectedValues
    : [selectedValues];
  // Call the function to populate the dropdown
  populateGroupDropdownforselecedvalue(
    dropdownId,
    labelsurl,
    optionsurl,
    "search-multiple",
    selectedValues
  );
}

function populateGroupDropdownforselecedvalue(
  dropdownId,
  labelsurl,
  optionsurl,
  type,
  values
) {
  const baseURL = base_URL + "/api/fetch";
  // console.clear();
  // // console.log(values);
  // Construct URLs with value parameter
  // let optionsURL;
  // let labelsURL;
  // if (labelsurl === 'section') {
  //     labelsURL = `${baseURL}/${labelsurl}?value=${encodeURIComponent(JSON.stringify(values))}`;
  //     optionsURL = `${baseURL}/list/${optionsurl}/value=${encodeURIComponent(JSON.stringify(values))}`;
  // } else {
  //     labelsURL = `${baseURL}/${labelsurl}?value=${encodeURIComponent(JSON.stringify(values))}`;
  //     optionsURL = `${baseURL}/groupId/${optionsurl}?value=${encodeURIComponent(JSON.stringify(values))}`;
  // }

  const labelsURL = `${baseURL}/${labelsurl}?value=${encodeURIComponent(
    JSON.stringify(values)
  )}`;
  const optionsURL = `${baseURL}/groupId/${optionsurl}?value=${encodeURIComponent(
    JSON.stringify(values)
  )}`;
  // console.log(values);
  // console.log('This is url :' + optionsURL);
  // console.log('This is url :' + labelsURL);
  // Make the API requests using axios
  axios
    .get(labelsURL)
    .then(function (responseLabels) {
      const labels = responseLabels.data;
      // // console.log('Labels:', labels);
      return axios.get(optionsURL).then(function (responseOptions) {
        const options = responseOptions.data;
        // // console.log('Options:', options);
        var dropdown = document.querySelector(dropdownId);
        var selectedValue = dropdown.getAttribute("SetValue");
        if (type === "search-multiple") {
          try {
            selectedValue = JSON.parse(selectedValue.replace(/&quot;/g, '"'));
          } catch (e) {
            console.error("Error parsing JSON:", e);
            selectedValue = [];
          }
        }
        createOptgroupSelect(dropdownId, labels, options, type, selectedValue);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}
// // Function to handle select change event
// function handleSelectChange() {
//     console.clear();
//     // Find all "Select All" options that have been selected
//     $('option[value^="select-all-"]:selected').each(function() {
//         var selectAllOption = $(this);
//         // Get the class name from the attribute 'data-class-name' of the selected option
//         var className = selectAllOption.attr('data-class-name');
//         // console.log("Selection changed in class: " + className);
//         // Select all options with that class name
//         var allOptions = $('option.' + className);
//         allOptions.prop('selected', true);
//         // Unselect the "Select All" option itself
//         selectAllOption.prop('selected', false);
//         // Trigger change event for Select2 or other listeners
//         selectAllOption.closest('select').trigger('change');
//     });
// }
function initializeSelect2(selectIds) {
  selectIds.forEach((selectId) => RemoveOption(selectId));
}

function RemoveOption(selectId) {
  $("#" + selectId)
    .select2()
    .on("change", function () {
      var selectedValues = $(this).val();
      if (selectedValues && selectedValues.length > 0) {
        $(this).find('option[value=""]').remove();
      }
      // No need to reinitialize select2 here as it's already initialized
    });
}
// Utility function to sanitize class names
function sanitizeClassName(className) {
  return className.replace(/[^a-zA-Z0-9-_]/g, "_");
}
// // Example handler for select change event
// function handleSelectChange(event) {
//     // Your code to handle the select change event
// }
// Function to handle select change event
function handleSelectChange() {
  // Find all "Select All" options that have been selected
  $('option[value^="select-all-"]:selected').each(function () {
    var selectAllOption = $(this);
    // Get the class name from the attribute 'data-class-name' of the selected option
    var className = selectAllOption.attr("data-class-name");
    // console.log("Selection changed in class: " + className);
    // Select all options with that class name
    var allOptions = $("option." + className);
    allOptions.prop("selected", true);
    // Unselect the "Select All" option itself
    selectAllOption.prop("selected", false);
    // Trigger change event for Select2 or other listeners
    selectAllOption.closest("select").trigger("change");
  });
  // $(this.id).valid();
  // $(this.id).attr('SetValue') = ''; // This line is commented out and seems incorrect
  let selectvalue = []; // Initialize an empty array
  let select = $(`#${this.id}`); // Correctly select the element using jQuery with its ID
  selectvalue.push(select.val()); // Push the value into the array
  console.log(selectvalue); // Log the array to the console
  let stringifiedArray = JSON.stringify(selectvalue[0]).replace(/"/g, "&quot;");
  console.log(stringifiedArray); // Log the array to the console
  // Set the attribute SetValue to the formatted string
  select.attr("SetValue", stringifiedArray);
  // alert('this work');
  callGarantField(this.value, this.id);
  select.valid();
  // console.log('This Work Proppaley');
}

function callGarantField(value, id) {
  // // console.log(value + ":::" + id);
  // // console.log(typeof(id));
  // alert('this is working');
  let url = "/list";
  if (value.trim() === "") {
    // console.log('Invalid value: Must be a non-empty string.');
    url = "";
    return;
  }
  switch (id) {
    case "Container_Present_Country":
      GarantField(
        "SelectSerch",
        "Container_Present_State",
        "Present state",
        url + "/state/" + value
      );
      break;
    case "Container_Permanent_Country":
      GarantField(
        "SelectSerch",
        "Container_Permanent_State",
        "Permanent state",
        url + "/state/" + value
      );
      break;
    case "Container_Present_State":
      GarantField(
        "SelectSerch",
        "Container_Present_City",
        "Present district",
        url + "/city/" + value
      );
      break;
    case "Container_Permanent_State":
      GarantField(
        "SelectSerch",
        "Container_Permanent_City",
        "Permanent district",
        url + "/city/" + value
      );
      break;
    case "Container_section":
      // populateGroupDropdown('#Container_State', 'Country', 'state', 'search-multiple');
      addOnChangeEventforgroup(
        "#Container_sub_section",
        "lable/section",
        "sub_section",
        "#Container_section"
      );
      addOnChangeEventforgroup(
        "#Container_caste",
        "lable/section",
        "caste",
        "#Container_section"
      );
      break;
    case "Container_Country":
      // populateGroupDropdown('#Container_State', 'Country', 'state', 'search-multiple');
      addOnChangeEventforgroup(
        "#Container_State",
        "Country",
        "state",
        "#Container_Country"
      );
      break;
    case "Container_State":
      // populateGroupDropdown('#Container_City', 'state', 'city', 'search-multiple');
      addOnChangeEventforgroup(
        "#Container_City",
        "state",
        "city",
        "#Container_State"
      );
      break;
    case "country":
      // populateGroupDropdown('#Container_State', 'Country', 'state', 'search-multiple');
      addOnChangeEventforgroup("#state", "Country", "state", "#country");
      break;
    case "state":
      // populateGroupDropdown('#Container_City', 'state', 'city', 'search-multiple');
      addOnChangeEventforgroup("#city", "state", "city", "#state");
      break;
    default:
      // console.log('Invalid value');
      break;
  }
}

// function callGarantField(value, id) {
//     // // console.log(value + ":::" + id);
//     // // console.log(typeof(id));
//     // alert('this is working');
//     let url = '/list'
//     if (value.trim() === '') {
//         // console.log('Invalid value: Must be a non-empty string.');
//         url = ''
//         return;
//     }
//     switch (id) {
//         case 'Container_Present_Country':
//             GarantField('SelectSerch', 'Container_Present_State', 'Select present state', url + '/state/' + value);
//             break;
//         case 'Container_Permanent_Country':
//             GarantField('SelectSerch', 'Container_Permanent_State', 'Select permanent state', url + '/state/' + value);
//             break;
//         case 'Container_Present_State':
//             GarantField('SelectSerch', 'Container_Present_City', 'Select present city', url + '/city/' + value);
//             break;
//         case 'Container_Permanent_State':
//             GarantField('SelectSerch', 'Container_Permanent_City', 'Select permanent city', url + '/city/' + value);
//             break;
//         case 'Container_section':
//             // populateGroupDropdown('#Container_State', 'Country', 'state', 'search-multiple');
//             addOnChangeEventforgroup('#Container_sub_section', 'lable/section', 'sub_section', '#Container_section');
//             addOnChangeEventforgroup('#Container_caste', 'lable/section', 'caste', '#Container_section');
//             break;
//         case 'Container_Country':
//             // populateGroupDropdown('#Container_State', 'Country', 'state', 'search-multiple');
//             addOnChangeEventforgroup('#Container_State', 'Country', 'state', '#Container_Country');
//             break;
//         case 'Container_State':
//             // populateGroupDropdown('#Container_City', 'state', 'city', 'search-multiple');
//             addOnChangeEventforgroup('#Container_City', 'state', 'city', '#Container_State');
//             break;
//         case 'country':
//             // populateGroupDropdown('#Container_State', 'Country', 'state', 'search-multiple');
//             addOnChangeEventforgroup('#state', 'Country', 'state', '#country');
//             break;
//         case 'state':
//             // populateGroupDropdown('#Container_City', 'state', 'city', 'search-multiple');
//             addOnChangeEventforgroup('#city', 'state', 'city', '#state');
//             break;
//         default:
//             // console.log('Invalid value');
//             break;
//     }
// }
// function trimArrayElements(arr) {
//     return arr.map(item => item.trim());
// }

function matchCustom(params, data) {
  // If there are no search terms, return all of the data
  if ($.trim(params.term) === "") {
    return data;
  }

  // Do not display the item if there is no 'text' property
  if (typeof data.text === "undefined") {
    return null;
  }

  // Normalize the term and data text by removing non-alphanumeric characters and making them lowercase
  const searchTerm = params.term.toLowerCase().replace(/[^a-z0-9]/g, "");
  const dataText = data.text.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Perform the search
  if (dataText.indexOf(searchTerm) > -1) {
    let modifiedData = $.extend({}, data, true);
    modifiedData.text += " (matched)";

    // Return the modified object
    return modifiedData;
  }

  // Return `null` if the term should not be displayed
  return null;
}
