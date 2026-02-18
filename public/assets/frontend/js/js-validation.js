// document.addEventListener('DOMContentLoaded', function() {
function setupValidation(
  formSelector,
  fieldIds = [],
  language = "en",
  validationRulesType = "all"
) {
  console.log("setupValidation");
  const validationrules = function () {
    // Get the gender value from window object or set default value
    const gender =
      window.MEMBER_GENDER === "bride"
        ? "bride's"
        : window.MEMBER_GENDER === "groom"
        ? "groom's"
        : "bride's or groom's";
    return {
      first_name: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter the first name",
          },
        },
      },
      middle_name: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter the middle name",
          },
        },
      },
      last_name: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter the last name",
          },
        },
      },
      email: {
        rules: {
          required: true,
          email: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter a valid Email ID",
          },
          email: {
            mr: "ईमेल पत्ता मान्य नहीं है",
            hi: "ईमेल पता मान्य नहीं है",
            en: "Please enter a valid Email ID",
          },
        },
      },
      email_address: {
        rules: {
          required: true,
          email: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter a valid Email ID",
          },
          email: {
            mr: "ईमेल पत्ता मान्य नहीं है",
            hi: "ईमेल पता मान्य नहीं है",
            en: "Please enter a valid Email ID",
          },
        },
      },
      phone: {
        rules: {
          required: true,
          indianPhoneNumber: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter a valid mobile number",
          },
          indianPhoneNumber: {
            mr: "मोबाइल नंबर मान्य नाही",
            hi: "मोबाइल नंबर मान्य नहीं है",
            en: "Please enter a valid mobile number",
          },
        },
      },
      mobile: {
        rules: {
          required: true,
          // "minlength": 10,
          // "maxlength": 10
          // "indianPhoneNumber": true
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter a valid mobile number",
          },
          // "minlength": {
          //     "mr": "कृपया 10 अंकी मोबाइल नंबर प्रविष्ट करा",
          //     "hi": "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें",
          //     "en": "Please enter a valid mobile number"
          // },
          // "maxlength": {
          //     "mr": "कृपया 10 अंकी मोबाइल नंबर प्रविष्ट करा",
          //     "hi": "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें",
          //     "en": "Please enter a valid mobile number"
          // }
          // "indianPhoneNumber": {
          //     "mr": "मोबाइल नंबर मान्य नाही",
          //     "hi": "मोबाइल नंबर मान्य नहीं है",
          //     "en": "Invalid mobile number"
          // }
        },
      },
      password: {
        rules: {
          required: true,
          minlength: 6,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter a minimum 6-digit of strong password",
          },
          minlength: {
            mr: "तुमचा पासवर्ड किमान 6 अक्षरे असणे आवश्यक आहे",
            hi: "तुम्हारा पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
            en: "Please enter a minimum 6-digit of strong password",
          },
        },
      },
      on_behalf: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया संदर्भात निर्दिष्ट करा",
            hi: "कृपया संदर्भात निर्दिष्ट करें",
            en: "Please choose whose profile is being created",
          },
        },
      },
      gender: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया आपला लिंग निवडा",
            hi: "कृपया अपना लिंग चुनें",
            en: "Please select your gender",
          },
        },
      },
      date_of_birth: {
        rules: {
          required: true,
          date: true, // Ensures the input is a valid date
          // "validAge": true,
          // "dateISO": true, // Ensures the date follows the ISO format (YYYY-MM-DD)
          // "maxDate": new Date() // Ensures the date is not in the future
        },
        messages: {
          required: {
            mr: "कृपया आपली जन्म तारीख प्रविष्ट करा",
            hi: "कृपया अपनी जन्म तिथि दर्ज करें",
            en: "Please enter the date of birth",
          },
          date: {
            mr: "कृपया एक वैध जन्म तारीख प्रविष्ट करा",
            hi: "कृपया एक मान्य जन्म तिथि दर्ज करें",
            en: "Please enter a valid date of birth",
          },
          // "dateISO": {
          //     "mr": "कृपया YYYY-MM-DD स्वरूपात जन्म तारीख प्रविष्ट करा",
          //     "hi": "कृपया YYYY-MM-DD प्रारूप में जन्म तिथि दर्ज करें",
          //     "en": "Please enter your date of birth in YYYY-MM-DD format"
          // },
          // "validAge": {
          //     "mr": "फक्त 18 वर्ष वयाच्या वरच्या वधूंचा नोंदणी करता येईल.",
          //     "hi": "केवल 18 वर्ष या उससे अधिक उम्र की वधू पंजीकरण कर सकती हैं.",
          //     "en": "Only those 18-year-old brides and 21-year-old grooms are allowed to register."
          // }
        },
      },
      caste: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया आपली जात निवडा",
            hi: "कृपया अपनी जाति चुनें",
            en: "Please select " + gender + " caste",
          },
        },
      },
      section: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया आपले विभाग निवडा",
            hi: "कृपया अपनी खंड चुनें",
            en: "Please select " + gender + " section",
          },
        },
      },
      subsection: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया आपला उपविभाग निवडा",
            hi: "कृपया अपनी उप-खंड चुनें",
            en: "Please select " + gender + " subsection",
          },
        },
      },
      otp: {
        rules: {
          required: true,
          digits: true,
          minlength: 6,
          maxlength: 6,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter the OTP",
          },
          digits: {
            mr: "कृपया अचूक OTP प्रविष्ट करा",
            hi: "कृपया सही OTP दर्ज करें",
            en: "Please enter the correct OTP",
          },
          minlength: {
            mr: "OTP 6 अंकीय असणे आवश्यक आहे",
            hi: "OTP 6 अंकों का होना चाहिए",
            en: "OTP must be 6 digits long",
          },
          maxlength: {
            mr: "OTP 6 अंकीय असणे आवश्यक आहे",
            hi: "OTP 6 अंकों का होना चाहिए",
            en: "OTP must be 6 digits long",
          },
        },
      },
      time_of_birth: {
        rules: {
          required: true,
          // "regex": "/^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/"
        },
        messages: {
          required: {
            mr: "कृपया आपली जन्म वेळ प्रविष्ट करा",
            hi: "कृपया अपनी जन्म समय दर्ज करें",
            en: "Please enter the time of birth",
          },
          // "regex": {
          //     "mr": "कृपया एक वैध 24-घंटेचा वेळ प्रविष्ट करा (उदाहरण: 14:30)",
          //     "hi": "कृपया एक मान्य 24-घंटे का समय दर्ज करें (उदाहरण: 14:30)",
          //     "en": "Please enter a valid time in 24-hour format (e.g., 14:30)."
          // }
        },
      },
      place_of_birth: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया आपले जन्म ठिकाण प्रविष्ट करा",
            hi: "कृपया अपना जन्म स्थान दर्ज करें",
            en:
              "Please select the nearest district to " + gender + " birthplace",
          },
        },
      },
      nakshtra: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया नक्षत्र निवडा",
            hi: "कृपया नक्षत्र चुनें",
            en: "Please select your Nakshatra.",
          },
        },
      },
      ras: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया रास निवडा",
            hi: "कृपया रास चुनें",
            en: "Please select " + gender + " ras",
          },
        },
      },
      gan: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया गण निवडा",
            hi: "कृपया गण चुनें",
            en: "Please select your Gan",
          },
        },
      },
      charan: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया चरण निवडा",
            hi: "कृपया चरण चुनें",
            en: "Please select your Charan.",
          },
        },
      },
      nadi: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया नाडी निवडा",
            hi: "कृपया नाडी चुनें",
            en: "Please select your Nadi.",
          },
        },
      },
      gotra: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया गोत्र निवडा",
            hi: "कृपया गोत्र चुनें",
            en: "Please enter your Gotra.",
          },
        },
      },
      present_country: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया वर्तमान देश निवडा",
            hi: "कृपया वर्तमान देश चुनें",
            en: "Please select " + gender + " present country",
          },
        },
      },
      present_state: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया वर्तमान राज्य निवडा",
            hi: "कृपया वर्तमान राज्य चुनें",
            en: "Please select " + gender + " present state",
          },
        },
      },
      present_city: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया वर्तमान शहर निवडा",
            hi: "कृपया वर्तमान शहर चुनें",
            en: "Please select " + gender + " present district",
          },
        },
      },
      permanent_country: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया स्थायी देश निवडा",
            hi: "कृपया स्थायी देश चुनें",
            en: "Please select " + gender + " permanent country",
          },
        },
      },
      permanent_state: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया स्थायी राज्य निवडा",
            hi: "कृपया स्थायी राज्य चुनें",
            en: "Please select " + gender + " permanent state",
          },
        },
      },
      permanent_city: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया स्थायी शहर निवडा",
            hi: "कृपया स्थायी शहर चुनें",
            en: "Please select " + gender + " permanent district",
          },
        },
      },
      native_place: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया मूल ठिकाण निवडा",
            hi: "कृपया मूल ठिकाण चुनें",
            en: "Please enter " + gender + " native place",
          },
        },
      },
      height: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया उंची प्रविष्ट करा",
            hi: "कृपया ऊँचाई दर्ज करें",
            en: "Please select " + gender + " height",
          },
        },
      },
      spectacles: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया चष्म्याची माहिती प्रविष्ट करा",
            hi: "कृपया चश्मा जानकारी दर्ज करें",
            en: "Please enter spectacles information",
          },
        },
      },
      weight: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया वजन प्रविष्ट करा",
            hi: "कृपया वजन दर्ज करें",
            en: "Please enter weight",
          },
        },
      },
      complexion: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया रंग प्रविष्ट करा",
            hi: "कृपया रंग दर्ज करें",
            en: "Please select your complexion",
          },
        },
      },
      blood_group: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया रक्तगट प्रविष्ट करा",
            hi: "कृपया रक्त समूह दर्ज करें",
            en: "Please select " + gender + " blood group",
          },
        },
      },
      disability: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया अपंगत्वाची माहिती प्रविष्ट करा",
            hi: "कृपया विकलांगता जानकारी दर्ज करें",
            en: "Please select " + gender + "  physical status",
          },
        },
      },
      other_disability: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया इतर अपंगत्व प्रविष्ट करा",
            hi: "कृपया अन्य विकलांगता दर्ज करें",
            en: "Please mention " + gender + " physical disability",
          },
        },
      },
      lens: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया लेन्सची माहिती प्रविष्ट करा",
            hi: "कृपया लेंस जानकारी दर्ज करें",
            en: "Please enter lens information",
          },
        },
      },
      about_me: {
        rules: {
          required: true,
          // "minlength": 10 // Assuming a minimum length of 10 characters for the about me section
        },
        messages: {
          required: {
            mr: "कृपया माझ्याबद्दल माहिती प्रविष्ट करा",
            hi: "कृपया मेरे बारे में जानकारी दर्ज करें",
            en: "Please enter about me information",
          },
          // "minlength": {
          //     "mr": "कृपया किमान 10 वर्ण प्रविष्ट करा",
          //     "hi": "कृपया कम से कम 10 वर्ण दर्ज करें",
          //     "en": "Please enter at least 10 characters"
          // }
        },
      },
      marital_status: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया वैवाहिक स्थिती निवडा",
            hi: "कृपया वैवाहिक स्थिति चुनें",
            en: "Please select " + gender + " marital status",
          },
        },
      },
      have_childs: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया आपल्याला मुलं आहेत का ते निवडा",
            hi: "कृपया बच्चों की जानकारी दर्ज करें",
            en: "Please select if you have children",
          },
        },
      },
      no_of_childs: {
        rules: {
          required: true,
          // "digits": true
        },
        messages: {
          required: {
            mr: "कृपया मुलांची संख्या प्रविष्ट करा",
            hi: "कृपया बच्चों की संख्या दर्ज करें",
            en: "Please select the number of children",
          },
          // "digits": {
          //     "mr": "कृपया वैध संख्या प्रविष्ट करा",
          //     "hi": "कृपया मान्य संख्या दर्ज करें",
          //     "en": "Please enter a valid number"
          // }
        },
      },
      no_of_chidls: {
        rules: {
          required: true,
          // "digits": true
        },
        messages: {
          required: {
            mr: "कृपया मुलांची संख्या प्रविष्ट करा",
            hi: "कृपया बच्चों की संख्या दर्ज करें",
            en: "Please enter the number of children",
          },
          // "digits": {
          //     "mr": "कृपया वैध संख्या प्रविष्ट करा",
          //     "hi": "कृपया मान्य संख्या दर्ज करें",
          //     "en": "Please enter a valid number"
          // }
        },
      },
      highest_education: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " highest education",
          },
        },
      },
      other_education: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter " + gender + " highest education",
          },
        },
      },
      highest_education_id: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " highest education",
          },
        },
      },
      occupation: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " occupation",
          },
        },
      },
      other_occupation: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter " + gender + " occupation",
          },
        },
      },
      specialization: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " specialization",
          },
        },
      },
      other_specialization: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter " + gender + " specialization",
          },
        },
      },
      company_name: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter " + gender + " company name",
          },
        },
      },
      designation: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter " + gender + " designation",
          },
        },
      },
      annual_income: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " annual income",
          },
        },
      },
      Job_Location_country: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter " + gender + " job location",
          },
        },
      },
      work_mode: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " work mode",
          },
        },
      },
      dietary_habits: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " dietary habits",
          },
        },
      },
      smoking_habits: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " smoking habits",
          },
        },
      },
      drinking_habits: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select " + gender + " drinking habits",
          },
        },
      },
      "languages_known[]": {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the languages you know.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      languages_known: {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the languages you know.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      mother_tongue: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your mother tongue.",
          },
        },
      },
      hobbies: {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your hobbies.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      "hobbies[]": {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your hobbies.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      "interest[]": {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your interests.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      interest: {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your interests.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      "dress_style[]": {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your dressing style.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      dress_style: {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your dressing style.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      sports: {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the sports you play.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      "sports[]": {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the sports you play.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      favourite_music: {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your favourite music.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      "favourite_music[]": {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your favourite music.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      favourite_food: {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your favourite food.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      "favourite_food[]": {
        rules: {
          required: true,
          minSelectedOptions: 2,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your favourite food.",
          },
          minSelectedOptions: {
            mr: "Please select at least 2 options",
            hi: "Please select at least 2 options",
            en: "Please select at least 2 options",
          },
        },
      },
      father_name: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter your father's name.",
          },
        },
      },
      mother_name: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter your mother's name.",
          },
        },
      },
      father_occupation: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your father's occupation.",
          },
        },
      },
      mother_occupation: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select your mother's occupation.",
          },
        },
      },
      no_of_brothers: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the number of brothers.",
          },
        },
      },
      no_of_married_brothers: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the number of married brothers.",
          },
        },
      },
      no_of_sisters: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the number of married sisters.",
          },
        },
      },
      no_of_married_sisters: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select the number of married sisters.",
          },
        },
      },
      family_type: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया कुटुंब प्रकार निवडा",
            hi: "कृपया परिवार का प्रकार चुनें",
            en: "Please select your family type.",
          },
        },
      },
      "family_assets[]": {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया कुटुंबाची मालमत्ता प्रविष्ट करा",
            hi: "कृपया परिवार की संपत्ति दर्ज करें",
            en: "Please select your family assets.",
          },
        },
      },
      living_with_parents: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया पालकांबरोबर राहता का ते निवडा",
            hi: "कृपया माता-पिता के साथ रहने का चयन करें",
            en: "Please select if you're living with your parents.",
          },
        },
      },
      family_status: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया कुटुंब स्थिती निवडा",
            hi: "कृपया परिवार की स्थिति चुनें",
            en: "Please select your family status.",
          },
        },
      },
      parents_contact_no: {
        rules: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter your parent's contact number.",
          },
          digits: {
            mr: "प्रविष्ट करा वैध संपर्क क्रमांक",
            hi: "वैध संपर्क नंबर दर्ज करें",
            en: "Enter a valid contact number",
          },
          minlength: {
            mr: "संपर्क क्रमांक किमान 10 अंकांचा असावा",
            hi: "संपर्क नंबर कम से कम 10 अंकों का होना चाहिए",
            en: "Contact number must be at least 10 digits long",
          },
          maxlength: {
            mr: "संपर्क क्रमांक जास्तीत जास्त 10 अंकांचा असावा",
            hi: "संपर्क नंबर अधिकतम 10 अंकों का होना चाहिए",
            en: "Contact number must be at most 10 digits long",
          },
        },
      },
      languages_known: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "This field is required",
          },
        },
      },
      manglik: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया मंगळिक स्थिती निवडा",
            hi: "कृपया मंगलिक स्थिति चुनें",
            en: "Please select " + gender + " manglik status",
          },
        },
      },
      marital_status: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया वैवाहिक स्थिती निवडा",
            hi: "कृपया वैवाहिक स्थिति चुनें",
            en: "Please select " + gender + " marital status",
          },
        },
      },
      employed_in: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया रोजगार निवडा",
            hi: "कृपया रोजगार चुनें",
            en: "Please select " + gender + " employed in status",
          },
        },
      },
      education: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया शिक्षण निवडा",
            hi: "कृपया शिक्षा चुनें",
            en: "Please select education",
          },
        },
      },
      occupation: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया व्यवसाय निवडा",
            hi: "कृपया व्यवसाय चुनें",
            en: "Please select " + gender + " occupation",
          },
        },
      },
      country: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया देश निवडा",
            hi: "कृपया देश चुनें",
            en: "Please select country",
          },
        },
      },
      state: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया राज्य निवडा",
            hi: "कृपया राज्य चुनें",
            en: "Please select state",
          },
        },
      },
      city: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया शहर निवडा",
            hi: "कृपया शहर चुनें",
            en: "Please select district",
          },
        },
      },
      min_annual_income: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया किमान वार्षिक उत्पन्न प्रविष्ट करा",
            hi: "कृपया न्यूनतम वार्षिक आय दर्ज करें",
            en: "Please enter minimum annual income",
          },
        },
      },
      max_annual_income: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया जास्तीत जास्त वार्षिक उत्पन्न प्रविष्ट करा",
            hi: "कृपया अधिकतम वार्षिक आय दर्ज करें",
            en: "Please enter maximum annual income",
          },
        },
      },
      child_accept: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया मुलांना स्वीकारण्याचा निर्णय निवडा",
            hi: "कृपया बच्चों को स्वीकार करने का निर्णय चुनें",
            en: "Please select child acceptance decision",
          },
        },
      },
      policy_2: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया अटी व शर्तीशी सहमत आहात का ते निवडा",
            hi: "कृपया नियम और शर्तों से सहमत हैं, इसे चेक करें",
            en: "Please agree to the Terms and Conditions",
          },
        },
      },
      policy_1: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया गोपनीयता धोरणाशी सहमत आहात का ते निवडा",
            hi: "कृपया गोपनीयता नीति से सहमत हैं, इसे चेक करें",
            en: "Please agree to the Privacy Policy",
          },
        },
      },
      contant_name: {
        rules: {
          required: true,
          string: true,
          max: 255,
        },
        messages: {
          required: {
            mr: "कृपया आपले नाव प्रविष्ट करा",
            hi: "कृपया अपना नाम दर्ज करें",
            en: "Please enter your full name",
          },
          string: {
            mr: "नाव मजकूर प्रकारात असले पाहिजे",
            hi: "नाम एक स्ट्रिंग होना चाहिए",
            en: "The name must be a string",
          },
          max: {
            mr: "नावाची लांबी 255 वर्णांपेक्षा जास्त नसावी",
            hi: "नाम की लंबाई 255 वर्णों से अधिक नहीं होनी चाहिए",
            en: "The name may not be greater than 255 characters",
          },
        },
      },
      contant_email: {
        rules: {
          required: true,
          email: true,
          max: 255,
        },
        messages: {
          required: {
            mr: "कृपया आपला ईमेल प्रविष्ट करा",
            hi: "कृपया अपना ईमेल दर्ज करें",
            en: "Please enter your valid email ID",
          },
          email: {
            mr: "कृपया वैध ईमेल पत्ता प्रविष्ट करा",
            hi: "कृपया एक मान्य ईमेल पता दर्ज करें",
            en: "Please enter a valid email address",
          },
          max: {
            mr: "ईमेलची लांबी 255 वर्णांपेक्षा जास्त नसावी",
            hi: "ईमेल की लंबाई 255 वर्णों से अधिक नहीं होनी चाहिए",
            en: "The email may not be greater than 255 characters",
          },
        },
      },
      contant_message: {
        rules: {
          required: true,
          string: true,
          max: 1000,
        },
        messages: {
          required: {
            mr: "कृपया आपला संदेश प्रविष्ट करा",
            hi: "कृपया अपना संदेश दर्ज करें",
            en: " Please enter your message",
          },
          string: {
            mr: "संदेश मजकूर प्रकारात असावा",
            hi: "संदेश एक स्ट्रिंग होना चाहिए",
            en: "The message must be a string",
          },
          max: {
            mr: "संदेशाची लांबी 1000 वर्णांपेक्षा जास्त नसावी",
            hi: "संदेश की लंबाई 1000 वर्णों से अधिक नहीं होनी चाहिए",
            en: "The message may not be greater than 1000 characters",
          },
        },
      },
      pan_number: {
        rules: {
          required: true,
          minlength: 10,
          maxlength: 10,
          // "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
        },
        messages: {
          required: {
            mr: "कृपया PAN क्रमांक प्रविष्ट करा",
            hi: "कृपया PAN नंबर दर्ज करें",
            en: "Please enter your PAN number",
          },
          minlength: {
            mr: "PAN क्रमांक 10 वर्णांचा असावा",
            hi: "PAN नंबर 10 अक्षरों का होना चाहिए",
            en: "PAN number must be 10 characters long",
          },
          maxlength: {
            mr: "PAN क्रमांक 10 वर्णांचा असावा",
            hi: "PAN नंबर 10 अक्षरों का होना चाहिए",
            en: "PAN number must be 10 characters long",
          },
          pattern: {
            mr: "कृपया वैध PAN क्रमांक प्रविष्ट करा (उदा. ABCDE1234F)",
            hi: "कृपया मान्य PAN नंबर दर्ज करें (उदा. ABCDE1234F)",
            en: "Please enter a valid PAN number (e.g. ABCDE1234F)",
          },
        },
      },
      dl_number: {
        rules: {
          required: true,
          minlength: 8,
          maxlength: 16,
          // "pattern": "^[A-Z0-9]{8,16}$"
        },
        messages: {
          required: {
            mr: "कृपया ड्रायव्हिंग लायसन्स क्रमांक प्रविष्ट करा",
            hi: "कृपया ड्राइविंग लाइसेंस नंबर दर्ज करें",
            en: "Please enter your Driving License number",
          },
          minlength: {
            mr: "ड्रायव्हिंग लायसन्स क्रमांक किमान 8 वर्णांचा असावा",
            hi: "ड्राइविंग लाइसेंस नंबर कम से कम 8 वर्णों का होना चाहिए",
            en: "Driving License number must be at least 8 characters long",
          },
          maxlength: {
            mr: "ड्रायव्हिंग लायसन्स क्रमांक जास्तीत जास्त 16 वर्णांचा असावा",
            hi: "ड्राइविंग लाइसेंस नंबर अधिकतम 16 वर्णों का होना चाहिए",
            en: "Driving License number must be no more than 16 characters long",
          },
          pattern: {
            mr: "कृपया वैध ड्रायव्हिंग लायसन्स क्रमांक प्रविष्ट करा",
            hi: "कृपया मान्य ड्राइविंग लाइसेंस नंबर दर्ज करें",
            en: "Please enter a valid Driving License number",
          },
        },
      },
      voter_id_number: {
        rules: {
          required: true,
          minlength: 10,
          maxlength: 12,
          // "pattern": "^[A-Z0-9]{10,12}$"
        },
        messages: {
          required: {
            mr: "कृपया मतदाता ओळखपत्र क्रमांक प्रविष्ट करा",
            hi: "कृपया वोटर आईडी नंबर दर्ज करें",
            en: "Please enter your Voter ID number",
          },
          minlength: {
            mr: "मतदाता ओळखपत्र क्रमांक किमान 10 वर्णांचा असावा",
            hi: "वोटर आईडी नंबर कम से कम 10 वर्णों का होना चाहिए",
            en: "Voter ID number must be at least 10 characters long",
          },
          maxlength: {
            mr: "मतदाता ओळखपत्र क्रमांक जास्तीत जास्त 12 वर्णांचा असावा",
            hi: "वोटर आईडी नंबर अधिकतम 12 वर्णों का होना चाहिए",
            en: "Voter ID number must be no more than 12 characters long",
          },
          pattern: {
            mr: "कृपया वैध मतदाता ओळखपत्र क्रमांक प्रविष्ट करा",
            hi: "कृपया मान्य वोटर आईडी नंबर दर्ज करें",
            en: "Please enter a valid Voter ID number",
          },
        },
      },
      pan_declaration: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया PAN घोषणेची पुष्टी करा",
            hi: "कृपया PAN घोषणा की पुष्टि करें",
            en: "Please confirm the PAN declaration",
          },
        },
      },
      dl_declaration: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया ड्रायव्हिंग लायसन्स घोषणेची पुष्टी करा",
            hi: "कृपया ड्राइविंग लाइसेंस घोषणा की पुष्टि करें",
            en: "Please confirm the Driving License declaration",
          },
        },
      },
      voter_declaration: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया मतदार ओळखपत्र घोषणेची पुष्टी करा",
            hi: "कृपया मतदाता पहचान पत्र घोषणा की पुष्टि करें",
            en: "Please confirm the Voter ID declaration",
          },
        },
      },
      Document_upload: {
        rules: {
          required: true,
          file: {
            extensions: "jpg,png,pdf",
          },
        },
        messages: {
          required: {
            mr: "कृपया दस्तावेज अपलोड करा",
            hi: "कृपया दस्तावेज़ अपलोड करें",
            en: "Please upload your document",
          },
          file: {
            extensions: {
              mr: "कृपया फक्त JPG, PNG, PDF फाइल्स अपलोड करा",
              hi: "कृपया केवल JPG, PNG, PDF फ़ाइलें अपलोड करें",
              en: "Please upload only JPG, PNG, PDF files",
            },
          },
        },
      },
      Document_upload_declaration: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "कृपया दस्तावेज अपलोड घोषणाची पुष्टी करा",
            hi: "कृपया दस्तावेज़ अपलोड घोषणा की पुष्टि करें",
            en: "Please confirm the document upload declaration",
          },
        },
      },
      profile_photo_set: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please upload your profile photo",
          },
        },
      },
      "g-recaptcha-response": {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please check CAPTCHA ",
          },
        },
      },
      current_job_location: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please enter " + gender + " job location",
          },
        },
      },
      contact_number_visibility: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "आवश्यक आहे",
            hi: "आवश्यक है",
            en: "Please select contact number visibility setting",
          },
        },
      },
      profile_photo_input: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "फोटो आवश्यक आहे",
            hi: "फोटो आवश्यक है",
            en: "Please upload a profile photo",
          },
        },
      },
      gallery_photo_input1: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "गॅलरी फोटो आवश्यक आहे",
            hi: "गैलरी फोटो आवश्यक है",
            en: "Please upload gallery photo 1",
          },
        },
      },
      gallery_photo_input2: {
        rules: {
          required: true,
        },
        messages: {
          required: {
            mr: "गॅलरी फोटो आवश्यक आहे",
            hi: "गैलरी फोटो आवश्यक है",
            en: "Please upload gallery photo 2",
          },
        },
      },
      gallery_photo_input3: {
        rules: {
          // "required": true
        },
        messages: {
          required: {
            mr: "गॅलरी फोटो आवश्यक आहे",
            hi: "गैलरी फोटो आवश्यक है",
            en: "Please upload gallery photo 3",
          },
        },
      },
      gallery_photo_input4: {
        rules: {
          // "required": true
        },
        messages: {
          required: {
            mr: "गॅलरी फोटो आवश्यक आहे",
            hi: "गैलरी फोटो आवश्यक है",
            en: "Please upload gallery photo 4",
          },
        },
      },
    };
  };
  // Please select your partner's manglik status
  const profileChangeRequest = {};
  const LoginForm = {
    email: {
      rules: {
        required: true,
        email: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please enter a valid Email ID",
        },
        email: {
          mr: "ईमेल पत्ता मान्य नहीं है",
          hi: "ईमेल पता मान्य नहीं है",
          en: "Please enter a valid Email ID",
        },
      },
    },
    email_address: {
      rules: {
        required: true,
        email: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please enter a valid Email ID",
        },
        email: {
          mr: "ईमेल पत्ता मान्य नहीं है",
          hi: "ईमेल पता मान्य नहीं है",
          en: "Please enter a valid Email ID",
        },
      },
    },
    phone: {
      rules: {
        required: true,
        indianPhoneNumber: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please enter a valid mobile number",
        },
        indianPhoneNumber: {
          mr: "मोबाइल नंबर मान्य नाही",
          hi: "मोबाइल नंबर मान्य नहीं है",
          en: "Please enter a valid mobile number",
        },
      },
    },
    mobile: {
      rules: {
        required: true,
        // "minlength": 10,
        // "maxlength": 10
        // "indianPhoneNumber": true
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please enter a valid mobile number",
        },
        // "minlength": {
        //     "mr": "कृपया 10 अंकी मोबाइल नंबर प्रविष्ट करा",
        //     "hi": "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें",
        //     "en": "Please enter a valid mobile number"
        // },
        // "maxlength": {
        //     "mr": "कृपया 10 अंकी मोबाइल नंबर प्रविष्ट करा",
        //     "hi": "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें",
        //     "en": "Please enter a valid mobile number"
        // }
        // "indianPhoneNumber": {
        //     "mr": "मोबाइल नंबर मान्य नाही",
        //     "hi": "मोबाइल नंबर मान्य नहीं है",
        //     "en": "Invalid mobile number"
        // }
      },
    },
    password: {
      rules: {
        required: true,
        minlength: 6,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please enter your password",
        },
        minlength: {
          mr: "तुमचा पासवर्ड किमान 6 अक्षरे असणे आवश्यक आहे",
          hi: "तुम्हारा पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
          en: "Please enter your password",
        },
      },
    },
  };
  const partnervalidationrules = {
    min_age: {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's min age",
        },
      },
    },
    max_age: {
      rules: {
        required: true,
        number: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's max age",
        },
      },
    },
    min_height: {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's min height",
        },
      },
    },
    max_height: {
      rules: {
        required: true,
        number: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's max height",
        },
      },
    },
    "caste[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's caste",
        },
      },
    },
    "section[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's section",
        },
      },
    },
    "subsection[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's sub section",
        },
      },
    },
    manglik: {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's manglik status",
        },
      },
    },
    // "flexRadioDefault": {
    //     "rules": {
    //         "required": true
    //     },
    //     "messages": {
    //         "required": {
    //             "mr": "आवश्यक आहे",
    //             "hi": "आवश्यक है",
    //             "en": "This field is required"
    //         }
    //     }
    // },
    "marital_status[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's marital status",
        },
      },
    },
    // "marital_status": {
    //     "rules": {
    //         "required": true
    //     },
    //     "messages": {
    //         "required": {
    //             "mr": "आवश्यक आहे",
    //             "hi": "आवश्यक है",
    //             "en": "This field is required"
    //         }
    //     }
    // },
    "employed_in[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected employed in status",
        },
      },
    },
    "education[]": {
      rules: {
        required: true,
        minSelectedOptions: 4,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected highest education",
        },
        minSelectedOptions: {
          mr: "Please Select 4 or More Options to Move Forward",
          hi: "Please Select 4 or More Options to Move Forward",
          en: "Please Select 4 or More Options to Move Forward",
        },
      },
    },
    "occupation[]": {
      rules: {
        required: true,
        minSelectedOptions: 4,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected occupation",
        },
        minSelectedOptions: {
          mr: "Please Select 4 or More Options to Move Forward",
          hi: "Please Select 4 or More Options to Move Forward",
          en: "Please Select 4 or More Options to Move Forward",
        },
      },
    },
    "country[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected countries",
        },
      },
    },
    "state[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected states",
        },
      },
    },
    "city[]": {
      rules: {
        required: true,
        minSelectedOptions: 4,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected districts",
        },
        minSelectedOptions: {
          mr: "Please Select 4 or More Options to Move Forward",
          hi: "Please Select 4 or More Options to Move Forward",
          en: "Please Select 4 or More Options to Move Forward",
        },
      },
    },
    min_annual_income: {
      rules: {
        required: true,
        number: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected min annual income",
        },
        number: {
          mr: "केवळ संख्या स्वीकार्य आहे",
          hi: "केवल संख्या मान्य है",
          en: "Only numbers are allowed",
        },
      },
    },
    max_annual_income: {
      rules: {
        required: true,
        number: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected max annual income",
        },
        number: {
          mr: "केवळ संख्या स्वीकार्य आहे",
          hi: "केवल संख्या मान्य है",
          en: "Only numbers are allowed",
        },
      },
    },
    "dietary_habits[]": {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected dietary habits",
        },
      },
    },
    smoking_habits: {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected smoking habits",
        },
      },
    },
    drinking_habits: {
      rules: {
        required: true,
      },
      messages: {
        required: {
          mr: "आवश्यक आहे",
          hi: "आवश्यक है",
          en: "Please select your partner's expected drinking habits",
        },
      },
    },
  };
  // });
  // let validationRules = validationrules();
  // if (validationRulesType == 'partner') {
  //     validationRules = partnervalidationrules;
  // }
  let validationRules = validationrules();
  if (validationRulesType == "partner") {
    validationRules = partnervalidationrules;
  } else if (validationRulesType == "profileChangeRequest") {
    validationRules = profileChangeRequest;
  } else if (validationRulesType == "LoginForm") {
    validationRules = LoginForm;
  }
  let rules = {};
  let messages = {};
  // Build the rules and messages objects based on the selected language
  $.each(validationRules, function (field, validation) {
    // console.log(validation);
    if (fieldIds.length === 0 || fieldIds.includes(field)) {
      rules[field] = validation.rules;
      messages[field] = {};
      $.each(validation.messages, function (rule, message) {
        messages[field][rule] = message[language];
      });
    }
  });
  // remove this if validationRules is not working
  $(formSelector).on("submit", function (event) {
    // Check if the input with name="mobile" exists
    const mobileInput = $('input[name="mobile"]');
    if (mobileInput.length) {
      // If the input exists
      // Remove all spaces from the input value
      mobileInput.val(mobileInput.val().replace(/\s/g, ""));
      console.log(mobileInput.val()); // Log the cleaned value
    }
    // Optionally, you can prevent the default form submission here for testing
    // event.preventDefault();
  });
  $(formSelector).validate({
    rules: rules,
    messages: messages,
    errorPlacement: function (error, element) {
      let name = element.attr("name");
      console.log(name);
      if (name) {
        let isArray = name.endsWith("[]");
        console.log(isArray);
        if (isArray) {
          // console.log(name);
          // Remove '[]' from the fieldId to get the name
          name = name.slice(0, -2);
        }
        $("#" + name + "_error").html(error); // Place error message inside the error element
      }
    },
    success: function (label, element) {
      // Convert the plain DOM element to a jQuery object
      var $element = $(element);
      var fieldName = $element.attr("name"); // Get the name attribute of the element
      if (fieldName) {
        // console.log(fieldName);
        // console.log(fieldName.endsWith('[]'));
        if (fieldName.endsWith("[]")) {
          // Remove '[]' from the fieldName to get the base name
          fieldName = fieldName.slice(0, -2); // Remove the last two characters '[]'
        }
        // Clear the error message on successful validation
        $("#" + fieldName + "_error").html(""); // Clear the error message
      }
    },
    highlight: function (element, errorClass, validClass) {
      // For Select2 elements, do nothing to the Select2 container directly
      if (!$(element).hasClass("select2-hidden-accessible")) {
        $(element).addClass(errorClass); // If not a Select2, do the default error highlighting
      }
    },
    unhighlight: function (element, errorClass, validClass) {
      // For Select2 elements, do nothing to the Select2 container directly
      if (!$(element).hasClass("select2-hidden-accessible")) {
        $(element).removeClass(errorClass); // If not a Select2, do the default removal
      }
    },
  });
  // Trigger validation on input
  // for the specified fields
  if (fieldIds.length > 0) {
    fieldIds.forEach(function (fieldId) {
      if (fieldId.endsWith("[]")) {
        // Remove '[]' from the fieldId to get the name
        fieldId = getFieldIdByFieldName(fieldId);
        console.log(fieldId);
        $("#" + fieldId).on("onchange", function () {
          $(this).valid(); // Trigger validation on the current input field
        });
      } else {
        $("#" + fieldId).on("focusout", function () {
          $(this).valid(); // Trigger validation on the current input field
        });
      }
    });
  } else {
    $(formSelector + " input").on("focusout", function () {
      $(this).valid(); // Trigger validation on all input fields
    });
    // $(formSelector + " select").on('onchang', function() {
    //     $(this).valid(); // Trigger validation on all input fields
    // });
  }
  // Only allow text input in fields with class 'text-only'
  $(".TextOnly").on("input", function () {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(this.value)) {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    }
  });
  // Only allow digit input in fields with class 'digit-only'
  $(".DigitOnly").on("input", function () {
    const regex = /^[0-9\s]*$/;
    if (!regex.test(this.value)) {
      this.value = this.value.replace(/[^0-9\s]/g, "");
    }
  });
  // Only allow PAN card format (5 letters, 4 digits, 1 letter) in fields with class 'PanOnly'
  $(".PanOnly").on("input", function () {
    // Remove any non-alphanumeric characters and convert to uppercase
    this.value = this.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const currentValue = this.value;
    let formattedValue = "";
    // Allow only first 5 characters to be letters
    const letters = currentValue.slice(0, 5).replace(/[^A-Z]/g, "");
    formattedValue += letters;
    // Allow only next 4 characters to be digits
    if (currentValue.length > 5) {
      const digits = currentValue.slice(5, 9).replace(/[^0-9]/g, "");
      formattedValue += digits;
    }
    // Allow only 1 final character to be a letter
    if (currentValue.length > 9) {
      const lastLetter = currentValue.slice(9, 10).replace(/[^A-Z]/g, "");
      formattedValue += lastLetter;
    }
    // Update the value of the input field
    this.value = formattedValue;
  });
  // Only allow Driving License format in fields with class 'DrivingLicenseOnly'
  $(".DrivingLicenseOnly").on("input", function () {
    // Remove any non-alphanumeric characters and convert to uppercase
    this.value = this.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const currentValue = this.value;
    let formattedValue = "";
    // Allow a minimum of 8 and maximum of 16 alphanumeric characters
    const license = currentValue.slice(0, 16).replace(/[^A-Z0-9]/g, "");
    formattedValue += license;
    // Update the value of the input field
    this.value = formattedValue;
  });
  // Only allow Voter ID format in fields with class 'VoterIdOnly'
  $(".VoterIdOnly").on("input", function () {
    // Remove any non-alphanumeric characters and convert to uppercase
    this.value = this.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const currentValue = this.value;
    let formattedValue = "";
    // Allow a minimum of 10 and maximum of 12 alphanumeric characters
    const voterId = currentValue.slice(0, 12).replace(/[^A-Z0-9]/g, "");
    formattedValue += voterId;
    // Update the value of the input field
    this.value = formattedValue;
  });
  $(".NameTextOnly").on("input", function () {
    // Remove any non-letter characters and spaces
    let value = this.value.replace(/[^a-zA-Z]/g, "");
    // Capitalize the first letter and make the rest lowercase
    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    // Set the processed value back to the input field
    this.value = value;
    // Move to the next field if the current field is not empty and the input is valid
    if (value.length > 0 && this.value.length === $(this).attr("maxlength")) {
      // Find the next input field and focus it
      let nextField = $(this).nextAll("input").first();
      if (nextField.length) {
        nextField.focus();
      }
    }
  });
  $(".EmailOnly").on("input", function () {
    // Define allowed characters and convert to lowercase
    let value = this.value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
    // Set the processed value back to the input field
    this.value = value;
    // Optionally, move to the next field if a valid email-like string is entered
    // You can adjust this condition based on your specific needs
    const emailPattern = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (emailPattern.test(value)) {
      let nextField = $(this).nextAll("input").first();
      if (nextField.length) {
        nextField.focus();
      }
    }
  });
  // // $(document).ready(function() {
  // $('.EmailOrMobile').on('focusout', function() {
  //     var inputVal = $(this).val();
  //     // Regular expression for email
  //     var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     // Regular expression for mobile number (assuming valid mobile numbers start with digits and have 10-15 digits)
  //     var mobilePattern = /^[0-9]{10,15}$/;
  //     if (emailPattern.test(inputVal)) {
  //         // Valid email
  //         console.log('Valid Email Address');
  //     } else if (mobilePattern.test(inputVal)) {
  //         // Valid mobile number
  //         console.log('Valid Mobile Number');
  //     } else {
  //         // Invalid input
  //         alert('Please enter a valid email address or mobile number.');
  //     }
  // });
  // });
  // $(document).ready(function() {
  $(".EmailOrMobile").on("change", function () {
    var inputVal = $(this).val();
    var errorDiv = $("#email_or_mobile_error");
    // Regular expression for email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regular expression for mobile number (assuming valid mobile numbers start with digits and have 10-15 digits)
    var mobilePattern = /^[0-9]{10,15}$/;
    errorDiv.hide(); // Hide the error message initially
    if (emailPattern.test(inputVal)) {
      // Valid email
      console.log("Valid Email Address");
      errorDiv.hide(); // Hide error if it's valid
    } else if (mobilePattern.test(inputVal)) {
      // Valid mobile number
      console.log("Valid Mobile Number");
      errorDiv.hide(); // Hide error if it's valid
    } else {
      // Invalid input
      errorDiv.text("Please enter a valid email address or mobile number.");
      errorDiv.show(); // Show the error message
    }
  });
  // });
}
// $(document).ready(function() {
//     // Attach change event listener to gender radio buttons
//     // Initial check on page load
//     // handleGenderChange();
// });
// Function to handle radio button changes
function handleGenderChange() {
  // Get the selected gender value
  let selectedGender = $('input[name="gender"]:checked').val();
  // alert('this work');
  // Check if the selected value is "1"
  if (selectedGender === "1") {
    // Show the select element if value is "1"
    $("#Container_on_behalf").show();
  } else {
    // Hide the select element for any other value
    $("#Container_on_behalf").hide();
  }
}
// Function to get the ID of an input field (file, select, or checkbox) by its name
function getFieldIdByFieldName(fieldName) {
  // Select the element by its name attribute for file inputs, select elements, or checkboxes
  var $input = $(`input[name='${fieldName}'], select[name='${fieldName}']`);
  // Return the ID of the selected element
  return $input.attr("id") || null; // Return null if the element is not found
}
// $.validator.addMethod("minSelectedOptionsBasedOnValue", function(value, element, params) {
//     var targetField = $(params.target);
//     var targetValue = params.value;
//     var selectedOptions = $(element).find("option:selected").length;
//     if (targetField.val() == targetValue) {
//         return selectedOptions >= params.minOptions;
//     }
//     return true; // No validation required if the target field doesn't match the specified value
// }, "Please select at least {0} options.");
$.validator.addMethod(
  "minSelectedOptions",
  function (value, element, params) {
    // alert("This work");
    var selectedOptions = $(element).find("option:selected").length;
    return selectedOptions >= params;
  },
  "Please select at least {0} options."
);
function teramMobilNumber() {
  $("#Container_Mobile_input").trigger("input");
  // // Check if the input with name="mobile" exists
  // const mobileInput = $('input[name="mobile"]');
  // if (mobileInput.length) { // If the input exists
  //     // Remove all spaces from the input value
  //     mobileInput.value = mobileInput.value.replace(/\s/g, '');
  //     console.log(mobileInput.value); // Log the cleaned value
  //     alert('This is Working');
  // }
}
function isAgeValid(dateOfBirth, gender) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  // Calculate the age
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  // Determine the minimum age based on gender
  let minAge;
  if (gender === "1") {
    minAge = 18; // Female
  } else if (gender === "2") {
    minAge = 21; // Male
  } else {
    return false; // Invalid gender
  }
  // Check if the user meets the minimum age requirement
  if (
    age > minAge ||
    (age === minAge && monthDifference > 0) ||
    (age === minAge &&
      monthDifference === 0 &&
      today.getDate() >= birthDate.getDate())
  ) {
    return true; // Valid
  }
  return false; // Invalid
}
// function setupValidation(formSelector, fieldIds = [], language = 'en', validationRules = validationrules) {
//     let rules = {};
//     let messages = {};
//     // Build the rules and messages objects based on the selected language
//     $.each(validationRules, function(field, validation) {
//         // console.log(validation);
//         if (fieldIds.length === 0 || fieldIds.includes(field)) {
//             rules[field] = validation.rules;
//             messages[field] = {};
//             $.each(validation.messages, function(rule, message) {
//                 messages[field][rule] = message[language];
//             });
//         }
//     });
//     $(formSelector).validate({
//         rules: rules,
//         messages: messages,
//         errorPlacement: function(error, element) {
//             let name = element.attr("name");
//             console.log(name);
//             if (name) {
//                 let isArray = name.endsWith('[]');
//                 console.log(isArray);
//                 if (isArray) {
//                     // console.log(name);
//                     // Remove '[]' from the fieldId to get the name
//                     name = name.slice(0, -2);
//                 }
//                 $("#" + name + "_error").html(error); // Place error message inside the error element
//             }
//         },
//         success: function(label, element) {
//             // Convert the plain DOM element to a jQuery object
//             var $element = $(element);
//             var fieldName = $element.attr("name"); // Get the name attribute of the element
//             if (fieldName) {
//                 // console.log(fieldName);
//                 // console.log(fieldName.endsWith('[]'));
//                 if (fieldName.endsWith('[]')) {
//                     // Remove '[]' from the fieldName to get the base name
//                     fieldName = fieldName.slice(0, -2); // Remove the last two characters '[]'
//                 }
//                 // Clear the error message on successful validation
//                 $("#" + fieldName + "_error").html(""); // Clear the error message
//             }
//         },
//         highlight: function(element, errorClass, validClass) {
//             // For Select2 elements, do nothing to the Select2 container directly
//             if (!$(element).hasClass('select2-hidden-accessible')) {
//                 $(element).addClass(errorClass); // If not a Select2, do the default error highlighting
//             }
//         },
//         unhighlight: function(element, errorClass, validClass) {
//             // For Select2 elements, do nothing to the Select2 container directly
//             if (!$(element).hasClass('select2-hidden-accessible')) {
//                 $(element).removeClass(errorClass); // If not a Select2, do the default removal
//             }
//         }
//     });
//     // Trigger validation on input
//     // for the specified fields
//     if (fieldIds.length > 0) {
//         fieldIds.forEach(function(fieldId) {
//             if (fieldId.endsWith('[]')) {
//                 // Remove '[]' from the fieldId to get the name
//                 fieldId = getFieldIdByFieldName(fieldId);
//                 console.log(fieldId);
//                 $("#" + fieldId).on('onchange', function() {
//                     $(this).valid(); // Trigger validation on the current input field
//                 });
//             } else {
//                 $("#" + fieldId).on('focusout', function() {
//                     $(this).valid(); // Trigger validation on the current input field
//                 });
//             }
//         });
//     } else {
//         $(formSelector + " input").on('focusout', function() {
//             $(this).valid(); // Trigger validation on all input fields
//         });
//         // $(formSelector + " select").on('onchang', function() {
//         //     $(this).valid(); // Trigger validation on all input fields
//         // });
//     }
//     // Only allow text input in fields with class 'text-only'
//     $(".TextOnly").on('input', function() {
//         const regex = /^[a-zA-Z\s]*$/;
//         if (!regex.test(this.value)) {
//             this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
//         }
//     });
//     // Only allow digit input in fields with class 'digit-only'
//     $(".DigitOnly").on('input', function() {
//         const regex = /^[0-9\s]*$/;
//         if (!regex.test(this.value)) {
//             this.value = this.value.replace(/[^0-9\s]/g, '');
//         }
//     });
//     $(".NameTextOnly").on('input', function() {
//         // Remove any non-letter characters and spaces
//         let value = this.value.replace(/[^a-zA-Z]/g, '');
//         // Capitalize the first letter and make the rest lowercase
//         if (value.length > 0) {
//             value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
//         }
//         // Set the processed value back to the input field
//         this.value = value;
//         // Move to the next field if the current field is not empty and the input is valid
//         if (value.length > 0 && this.value.length === $(this).attr('maxlength')) {
//             // Find the next input field and focus it
//             let nextField = $(this).nextAll('input').first();
//             if (nextField.length) {
//                 nextField.focus();
//             }
//         }
//     });
//     $(".EmailOnly").on('input', function() {
//         // Define allowed characters and convert to lowercase
//         let value = this.value.toLowerCase().replace(/[^a-z0-9@._-]/g, '');
//         // Set the processed value back to the input field
//         this.value = value;
//         // Optionally, move to the next field if a valid email-like string is entered
//         // You can adjust this condition based on your specific needs
//         const emailPattern = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
//         if (emailPattern.test(value)) {
//             let nextField = $(this).nextAll('input').first();
//             if (nextField.length) {
//                 nextField.focus();
//             }
//         }
//     });
// }
// // $(document).ready(function() {
// //     // Attach change event listener to gender radio buttons
// //     // Initial check on page load
// //     // handleGenderChange();
// // });
// // Function to handle radio button changes
// function handleGenderChange() {
//     // Get the selected gender value
//     let selectedGender = $('input[name="gender"]:checked').val();
//     alert('this work');
//     // Check if the selected value is "1"
//     if (selectedGender === "1") {
//         // Show the select element if value is "1"
//         $('#Container_on_behalf').show();
//     } else {
//         // Hide the select element for any other value
//         $('#Container_on_behalf').hide();
//     }
// }
// // Function to get the ID of an input field (file, select, or checkbox) by its name
// function getFieldIdByFieldName(fieldName) {
//     // Select the element by its name attribute for file inputs, select elements, or checkboxes
//     var $input = $(`input[name='${fieldName}'], select[name='${fieldName}']`);
//     // Return the ID of the selected element
//     return $input.attr('id') || null; // Return null if the element is not found
// }
