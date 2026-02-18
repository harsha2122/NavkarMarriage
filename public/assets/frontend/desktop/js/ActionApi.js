const requests = {
  resendOtp: {
    url: "/api/resend-otp",
    method: "GET",
    alert: true,
    prime: false,
    return: false,
    token: false,
  },
  SendInterest: {
    url: "/api/send-interest",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: loadCancelInterest,
  },
  CancelInterest: {
    url: "/api/cancel-interest",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: loadSendInterest,
  },
  InboxCancelInterest: {
    url: "/api/cancel-interest",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: hideParent,
  },
  AcceptInterest: {
    url: "/api/accept-interest",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: hideParent,
  },
  RejectInterest: {
    url: "/api/reject-interest",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: hideParent,
  },
  // Ignore: {
  //     url: '/api/ignore-member',
  //     method: 'POST',
  //     alert: true,
  //     return: false,
  //     prime: true,
  //     token: true,
  //     function: hideParent,
  // },
  // RemoveIgnore: {
  //     url: '/api/remove-ignore',
  //     method: 'POST',
  //     alert: true,
  //     return: false,
  //     prime: true,
  //     token: true,
  //     function: hideParent,
  // },
  Ignore: {
    url: "/api/ignore-member",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: loadRemoveIgnore,
  },
  RemoveIgnore: {
    url: "/api/remove-ignore",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: loadIgnoreProfile,
  },
  InboxIgnore: {
    url: "/api/ignore-member",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: hideParent,
  },
  InboxRemoveIgnore: {
    url: "/api/remove-ignore",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: hideParent,
  },
  View: {
    url: "/api/save-profile-visitor",
    method: "POST",
    alert: false,
    return: false,
    prime: false,
    token: true,
  },
  RemoveFromShotlist: {
    url: "/api/shortlist/remove",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: loadAddToShortlist,
  },
  InboxRemoveFromShotlist: {
    url: "/api/shortlist/remove",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: hideParent,
  },
  AddToShotlist: {
    url: "/api/shortlist/add",
    method: "POST",
    alert: true,
    return: false,
    prime: true,
    token: true,
    function: loadRemoveFromShortlist,
  },
  UpdateOnlineStatus: {
    url: "/api/update-online-status",
    method: "GET",
    alert: false,
    return: false,
    prime: false,
    token: true,
  },
  ChackContact: {
    url: "/api/chack-contact",
    method: "POST",
    alert: false,
    return: true,
    prime: false,
    token: true,
    // function: showContactLimitModal,
  },
  ShowContactView: {
    url: "/api/view-contact",
    method: "POST",
    alert: false,
    return: true,
    prime: false,
    token: true,
    // function: showContactLimitModal,
  },
  NotificationRead: {
    url: "/api/notification-read",
    method: "POST",
    alert: false,
    return: false,
    prime: false,
    token: true,
  },
  GetAadharUrl: {
    url: "/api/create-aadhar-url",
    method: "POST",
    alert: true,
    return: true,
    prime: false,
    token: true,
  },
  ProfileChange: {
    url: "/api/profile-change-requests",
    method: "POST",
    alert: true,
    return: false,
    prime: false,
    token: true,
  },
};
// Function to perform requests
function performRequest(
  requestName,
  requestData = {},
  args = {},
  base_URL = window.API_BASE_URL
) {
  //alert(requestName);
  if (!requests.hasOwnProperty(requestName)) {
    console.error("Request name not found.");
    return;
  }
  const requestDetails = requests[requestName];
  // if (requestDetails.prime) {
  //     console.error('Request name not found.');
  //     return;
  // }
  // if (requestData && requestData.model_id) {
  // closeModal(requestData.model_id);
  // }
  // Prepare headers
  const headers = {};
  if (requestDetails.token) {
    headers["Authorization"] = getToken("JwtApiToken");
    // console.log(headers);
  }
  const axiosConfig = { headers: headers };
  if (requestDetails.method === "GET") {
    axios
      .get(`${base_URL}${requestDetails.url}`, {
        ...axiosConfig,
        params: requestData,
      })
      .then(function (response) {
        // console.log('Response:', response.data);
        if (requestDetails.alert) {
          //alert(response.data.message || JSON.stringify(response.data));
          createToast("success", response.data.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        if (requestDetails.alert) {
          // //alert(error.message);
          createToast("error", error.message);
        }
      });
  } else if (requestDetails.method === "POST" && requestDetails.return) {
    // console.log(`${base_URL}${requestDetails.url}`);
    return axios
      .post(`${base_URL}${requestDetails.url}`, requestData, axiosConfig)
      .then((response) => {
        // console.log('Response:', response.data);

        // Execute the function if provided
        if (requestDetails.function) {
          requestDetails.function.call(null, response.data);
        }

        // Optionally show a toast or alert based on requestDetails
        if (requestDetails.alert) {
          createToast(
            "success",
            response.data.message || "Operation successful"
          );
        }

        // Return the response data
        // Use Array.includes() for checking the requestName
        if (["ShowContactView", "ChackContact"].includes(requestName)) {
          return response; // Return full response for specific requests
        }

        return response.data; // Return only data for other requests
      })
      .catch((error) => {
        // Use Array.includes() for checking the requestName
        if (["ShowContactView", "ChackContact"].includes(requestName)) {
          return response; // Return full response for specific requests
        }
        console.error("Error:", error);

        // Check if error.response exists and handle it
        if (error.response) {
          // Show error message from response if available
          if (requestDetails.alert) {
            createToast(
              "error",
              error.response.data.message ||
                "An error occurred. Please try again."
            );
          }
        } else {
          // Handle network errors or unexpected issues
          if (requestDetails.alert) {
            createToast(
              "error",
              "Network error. Please check your connection."
            );
          }
        }
      });
  } else if (requestDetails.method === "POST") {
    // console.log(`${base_URL}${requestDetails.url}`);
    axios
      .post(`${base_URL}${requestDetails.url}`, requestData, axiosConfig)
      .then(function (response) {
        // console.log('Response:', response.data);
        // //alert(response.data.message || JSON.stringify(response.data));
        //alert('This ia working fine here');
        if (requestDetails.function) {
          // Call the function with provided arguments
          requestDetails.function.call(null, args);
          // window[functionName].apply(null, args);
        }
        if (requestDetails.alert) {
          createToast("success", response.data.message);
        }
        if (requestDetails.return) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        if (requestDetails.alert) {
          //alert(error.response.data.message);
          createToast("error", error.response.data.message);
        }
      });
  }
  // Add more methods as needed (PUT, DELETE, etc.)
}

function loadCancelInterest(args) {
  const memberId = args.memberid;
  const buttonId = args.buttonid;
  //alert('Member ID: ' + memberId + ', Button ID: ' + buttonId);
  // Select the button using the buttonId
  const button = document.getElementById(buttonId);
  // Check if the button exists
  if (button) {
    // Create a new Cancel Interest button
    const cancelButton = document.createElement("a");
    // cancelButton.type = 'button';
    cancelButton.className = "btn btn-outline-secondary CancelInterest";
    cancelButton.id = "CancelInterest" + memberId;
    cancelButton.setAttribute("data-profile-id", memberId);
    // cancelButton.setAttribute('onclick', `performRequest('CancelInterest', { to_member_id: ${memberId} }, { memberid:  ${memberId} , buttonid: 'CancelInterest${memberId}' })`);
    cancelButton.innerHTML =
      '<i class="fal fa-times-circle"></i>  Cancel Interest';
    // Replace the old button with the new Cancel Interest button
    button.parentNode.replaceChild(cancelButton, button);
    // attachModalByID(cancelButton.id, 'CancelInterestModel');
    //alert("model is active");
    attachModalByButtonIds([cancelButton.id]);
  } else {
    console.error(`Button with ID '${buttonId}' not found.`);
  }
}

function loadSendInterest(args) {
  // Alert for debugging
  //alert("Function loaded successfully");
  // Extract member ID and button ID from args
  const memberId = args.memberid;
  const buttonId = args.buttonid;
  // Alert to display member ID and button ID (for debugging)
  //alert(`Member ID: ${memberId}, Button ID: ${buttonId}`);
  // Select the button using the buttonId
  const button = document.getElementById(buttonId);
  // Check if the button exists
  if (button) {
    // Create a new Send Interest button
    const sendButton = document.createElement("a");
    // sendButton.type = 'button';
    sendButton.className = "SendInterest btn btn-primary";
    sendButton.id = "SendInterest" + memberId;
    sendButton.setAttribute("data-profile-id", memberId);
    // sendButton.setAttribute('onclick', `performRequest('SendInterest', { to_member_id: ${memberId} }, [${memberId}, 'SendInterest' + ${memberId}])`);
    sendButton.innerHTML = '<i class="far fa-heart"></i>  Send Interest';
    // Replace the old button with the new Send Interest button
    button.parentNode.replaceChild(sendButton, button);
    // attachModalByID(sendButton.id, 'SendInterestModel');
    attachModalByButtonIds([sendButton.id]);
  } else {
    console.error(`Button with ID '${buttonId}' not found.`);
  }
}

function loadIgnoreProfile(args) {
  const memberId = args.memberid;
  const buttonId = args.buttonid;

  // Select the button using the buttonId
  const button = document.getElementById(buttonId);

  // Check if the button exists
  if (button) {
    // Create a new Ignore Profile button
    const ignoreButton = document.createElement("a");
    ignoreButton.className = "Ignore";
    ignoreButton.id = "Ignore" + memberId;
    ignoreButton.setAttribute("data-profile-id", memberId);
    ignoreButton.innerHTML = '<i class="far fa-ban"></i> Ignore';

    // Replace the old button with the new Ignore button
    button.parentNode.replaceChild(ignoreButton, button);

    // Attach modal if necessary
    attachModalByButtonIds([ignoreButton.id]);

    // Optionally, set up the onclick event
    // ignoreButton.setAttribute('onclick', `performRequest('Ignore', { ignored_member_id: ${memberId} }, { memberid: ${memberId}, buttonid: 'IgnoreProfile${memberId}' })`);
  } else {
    console.error(`Button with ID '${buttonId}' not found.`);
  }
}

function loadRemoveIgnore(args) {
  const memberId = args.memberid;
  const buttonId = args.buttonid;

  // Select the button using the buttonId
  const button = document.getElementById(buttonId);

  // Check if the button exists
  if (button) {
    // Create a new Remove Ignore button
    const removeIgnoreButton = document.createElement("a");
    removeIgnoreButton.className = "mt-3 RemoveIgnore";
    removeIgnoreButton.id = "RemoveIgnore" + memberId;
    removeIgnoreButton.setAttribute("data-profile-id", memberId);
    removeIgnoreButton.innerHTML =
      ' <i class="far fa-user-unlock"></i> Unblock Now';

    // Replace the old button with the new Remove Ignore button
    button.parentNode.replaceChild(removeIgnoreButton, button);

    // Attach modal if necessary
    attachModalByButtonIds([removeIgnoreButton.id]);

    // Optionally, set up the onclick event
    // removeIgnoreButton.setAttribute('onclick', `performRequest('RemoveIgnore', { ignored_member_id: ${memberId} }, { memberid: ${memberId}, buttonid: 'RemoveIgnore${memberId}' })`);
  } else {
    console.error(`Button with ID '${buttonId}' not found.`);
  }
}

function deleteContainerById(args) {
  //alert('This is Container' + args.MemberContainer)
  $("#" + args.MemberContainer).remove();
}

function loadAddToShortlist(args) {
  // Extract member ID and button ID from args
  const memberId = args.memberid;
  const buttonId = args.buttonid;
  // Select the button using the buttonId
  const button = document.getElementById(buttonId);
  // Check if the button exists
  if (button) {
    // Create a new Add to Shortlist button
    const addToShortlistButton = document.createElement("a");
    // addToShortlistButton.type = 'button';
    addToShortlistButton.className = "btn btn-small ";
    addToShortlistButton.id = "AddToShortlist" + memberId;
    addToShortlistButton.setAttribute("data-profile-id", memberId);
    addToShortlistButton.setAttribute(
      "onclick",
      `performRequest('AddToShotlist', { shortlisted_member_id: ${memberId} }, { memberid: ${memberId}, buttonid: 'AddToShortlist${memberId}' })`
    );
    addToShortlistButton.innerHTML = '<i class="far fa-star"></i> Shortlist';
    // Replace the old button with the new Add to Shortlist button
    button.parentNode.replaceChild(addToShortlistButton, button);
    // attachModalByID(addToShortlistButton.id, 'AddToShotlistModel');
    // attachModalByButtonIds([addToShortlistButton.id])
  } else {
    console.error(`Button with ID '${buttonId}' not found.`);
  }
}

function loadRemoveFromShortlist(args) {
  // Extract member ID and button ID from args
  const memberId = args.memberid;
  const buttonId = args.buttonid;
  // Select the button using the buttonId
  const button = document.getElementById(buttonId);
  // Check if the button exists
  if (button) {
    // Create a new Remove from Shortlist button
    const removeFromShortlistButton = document.createElement("a");
    // removeFromShortlistButton.type = 'button';
    removeFromShortlistButton.className = "btn btn-small ";
    removeFromShortlistButton.id = "RemoveFromShortlist" + memberId;
    removeFromShortlistButton.setAttribute("data-profile-id", memberId);
    removeFromShortlistButton.setAttribute(
      "onclick",
      `performRequest('RemoveFromShotlist', { shortlisted_member_id: ${memberId} }, { memberid: ${memberId}, buttonid: 'RemoveFromShortlist${memberId}' })`
    );
    removeFromShortlistButton.innerHTML =
      '<i class="fal fa-times-circle"></i> Shortlisted';
    // Replace the old button with the new Remove from Shortlist button
    button.parentNode.replaceChild(removeFromShortlistButton, button);
    // attachModalByID(removeFromShortlistButton.id, 'RemoveFromShotlistModel');
    // attachModalByButtonIds([removeFromShortlistButton.id]);
  } else {
    console.error(`Button with ID '${buttonId}' not found.`);
  }
}

function hideParentWithClass(elementId) {
  // Select the element by ID
  const element = $("#" + elementId);
  // Find the closest parent with the class .user-list and hide it
  element.closest(".Parent_Class").hide();
}

function hideParent(args) {
  // const memberId = args.memberid;
  const buttonId = args.buttonid;
  //alert('Member ID: ' + memberId + ', Button ID: ' + buttonId);
  hideParentWithClass(buttonId);
}

function updateModalContent(data) {
  // Update the modal content with the fetched data
  $("#modal-mobile").text(data.mobile ? data.mobile : "Not Filled");
  $("#modal-email").text(data.email ? data.email : "Not Filled");
  $("#modal-parents-mobile").text(
    data.parents_contact_no ? data.parents_contact_no : "Not Filled"
  );
}

function showContactLimitModal(viewedMemberId) {
  axios
    .post(`${base_URL}/api/chack-contact`, {})
    .then((response) => {
      // console.log(response);

      // Check if response data exists and has the correct structure
      if (response && response.data && response.data.status) {
        const modalContent = `
                    <div class="modal-header p-0 mt-4">
                        <h3 class="w-100">Weekly Contact Limit Information</h3>
                        <img src="${
                          window.ASSET_PATH + "assets/frontend/img/call-pop.png"
                        }" class="w-100">
                    </div>
                    <div class="modal-body text-center">
                        <h6>You have ${
                          response.data.data.weekly_contact_limit
                        } weekly contact limit</h6>
                        <p>You can view <strong>${
                          response.data.data.weekly_contact_limit -
                          response.data.data.total_weekly_contact_view
                        } contacts this week</strong>. Each view counts toward your limit. Use your views carefully!</p>
                        <div class="model-footer m-auto">
                            <button onclick="showContactViewModal(${viewedMemberId})" type="button" class="btn btn-primary mb-2 w-50">
                                <i class="fad fa-phone-alt"></i> View Contact
                            </button>
                            <p><a type="button" data-bs-dismiss="modal"><i class="far fa-times-circle"></i> No</a></p>
                        </div>
                    </div>
                `;
        updateModal(modalContent);
      }
    })
    .catch((error) => {
      // console.log("Error occurred:", error);
      let modalContent = "";
      let status = error.response ? error.response.status : 500;
      let data = error.response ? error.response.data : {};

      switch (status) {
        case 401:
          modalContent = `
                        <div class="modal-body text-center">
                            <p class="text-danger">${
                              data.message || "Unauthorized access."
                            }</p>
                            <div><a href="${
                              window.API_BASE_URL
                            }/home/login" class="btn btn-primary">Login</a></div>
                        </div>
                    `;
          break;
        case 403:
          modalContent = ` <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"><i class="far fa-times-circle"></i></button>
                                        <div class="modal-header p-0 mt-4">
                                            <h3 class="w-100">You’ve Reached 15 of Your 10 Weekly Contacts </h3>
                                            <img src="${
                                              window.ASSET_PATH +
                                              "assets/frontend/img/call-expired.png"
                                            }"
                                                class="w-100">
                                        </div>
                                        <div class="modal-body text-center">
                                            <h6>Want access to exclusive contact features? <a href="/upgrade">Become a Primary Member</a> today and start connecting with premium contacts </h6>

                                            <div class="model-footer m-auto">
                                                <a  href="${
                                                  window.API_BASE_URL
                                                }/home/plan"  id="contactModal2"
                                                    class="btn btn-primary mb-2 w-50" ><i
                                                        class="fad fa-phone-alt"></i> Upgrade Weekly Limit </a>
                                                <p>
                                                    <a type="button" data-bs-dismiss="modal"><i
                                                            class="far fa-times-circle"></i> No </a>
                                                </p>
                                            </div>
                                        </div>`;

          //       <div class="modal-header p-0">
          //       <img src="${window.ASSET_PATH + 'assets/frontend/img/pop_up.png'}" class="w-100">
          //   </div>
          //   <p>${data.message || 'You do not have permission to perform this action.'}</p>
          //   <div><a href="${window.API_BASE_URL}/home/plan" class="btn btn-border"><i class="fas fa-crown"></i> Upgrade Now</a></div>

          break;
        case 404:
          modalContent = `<p class="text-danger">${
            data.message || "Member not found."
          }</p>`;
          break;
        case 409:
          modalContent = `
                        <div class="modal-body text-center">
                            <h3>No Remaining Contacts</h3>
                            <p>${
                              data.message ||
                              "You have no remaining contacts available."
                            }</p>
                            <p>Remaining contacts: ${
                              data.plan_data?.remain_contact || 0
                            }</p>
                        </div>
                    `;
          break;
        case 429:
          modalContent = `


                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"><i class="far fa-times-circle"></i></button>
                                        <div class="modal-header p-0 mt-4">
                                            <h3 class="w-100">You’ve Reached 15 of Your 10 Weekly Contacts </h3>
                                            <img src="${
                                              window.ASSET_PATH +
                                              "assets/frontend/img/call-expired.png"
                                            }"
                                                class="w-100">
                                        </div>
                                        <div class="modal-body text-center">
                                            <h6> You’ve exceeded your weekly limit of contact views. Upgrade to access more
                                                contacts. </h6>

                                            <div class="model-footer m-auto">
                                                <a  href="${
                                                  window.API_BASE_URL
                                                }/home/plan"  id="contactModal2"
                                                    class="btn btn-primary mb-2 w-50" ><i
                                                        class="fad fa-phone-alt"></i> Upgrade Weekly Limit </a>
                                                <p>
                                                    <a type="button" data-bs-dismiss="modal"><i
                                                            class="far fa-times-circle"></i> No </a>
                                                </p>
                                            </div>
                                        </div>

                       
                    `;

          //     <div class="modal-header p-0">
          //     <img src="${window.ASSET_PATH + 'assets/frontend/img/pop_up.png'}" class="w-100">
          // </div>
          // <p>${data.message || 'You have reached your weekly contact limit.'}</p>
          // <p>Please wait for it to reset or consider upgrading your plan.</p>
          // <div><a href="${window.API_BASE_URL}/home/plan" class="btn btn-border"><i class="fas fa-crown"></i> Upgrade Now</a></div>
          break;
        default:
          modalContent = `
                        <div class="modal-body text-center">
                            <p class="text-danger">${
                              data.message || "An unexpected error occurred."
                            }</p>
                            <button class="btn btn-secondary mt-3" data-bs-dismiss="modal">Close</button>
                        </div>
                    `;
          break;
      }

      updateModal(modalContent);
    });
}

// Helper function to update modal content and show it
function updateModal(content) {
  const modalElement = document.getElementById("contactDetails");
  if (modalElement) {
    modalElement.innerHTML = content;

    // Show the modal using Bootstrap
    const modalContainer = document.getElementById("ContactModal");
    if (modalContainer) {
      const bsModal = new bootstrap.Modal(modalContainer);
      bsModal.show();
    }
  }
}

function showContactViewModal(viewedMemberId) {
  const modal = $("#contactViewModal");

  // Fetch member details from your server
  $.ajax({
    url: `${base_URL}/api/view-contact`, // Adjust this endpoint as necessary
    method: "POST",
    data: {
      viewed_member_id: viewedMemberId, // Send the viewed_member_id
    },
    success: function (data, textStatus, xhr) {
      const status = xhr.status; // Get the status code
      let modalContent;

      switch (status) {
        case 200:
          // Successful contact view recorded
          const contactDetails = data.contact_details;
          modalContent = `
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="far fa-times-circle"></i>
                    </button>
                    <div class="modal-header p-0 mt-4">
                        <h3 class="w-100">All Contact Details</h3>
                        <img src="${
                          window.ASSET_PATH + "assets/frontend/img/call-pop.png"
                        }" class="w-100">
                    </div>
                    <div class="modal-body  text-center">
                        <ul>
                            ${
                              contactDetails.mobile_number
                                ? `
                                <li>Bride/Groom Contact Number: <br>
                                    <strong> + ${contactDetails.country_phone_code} ${contactDetails.mobile_number} 
                                        <i class="fad fa-copy copy-icon" data-text="+${contactDetails.country_phone_code} ${contactDetails.mobile_number}"></i>
                                    </strong>
                                </li>
                            `
                                : ""
                            }
                            ${
                              contactDetails.parents_contact_no
                                ? `
                                <li>Bride/Groom Parent's Contact Number: <br>
                                    <strong> + ${contactDetails.parents_mobile_countryCode} ${contactDetails.parents_contact_no} 
                                        <i class="fad fa-copy copy-icon" data-text="+${contactDetails.parents_mobile_countryCode} ${contactDetails.parents_contact_no}"></i>
                                    </strong>
                                </li>
                            `
                                : ""
                            }
                            ${
                              contactDetails.email_address
                                ? `
                                <li>Bride/Groom Email ID: <br>
                                    <strong>${contactDetails.email_address}
                                        <i class="fad fa-copy copy-icon" data-text="${contactDetails.email_address}"></i>
                                    </strong>
                                </li>
                            `
                                : ""
                            }
                        </ul>
                    </div>
                `;
          break;
        case 400:
          if (data.message.includes("No remaining contacts available")) {
            modalContent = `
                            <div class="modal-body text-center">
                                <h3>No Remaining Contacts</h3>
                                <p>${data.message}</p>
                            </div>
                        `;
          } else if (data.message.includes("Weekly contact limit reached")) {
            modalContent = `
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i class="far fa-times-circle"></i>
                            </button>
                            <div class="modal-header p-0 mt-4">
                                <h3 class="w-100">Weekly Contact Limit Reached</h3>
                                <img src="${
                                  window.ASSET_PATH +
                                  "assets/frontend/img/call-expired.png"
                                }" class="w-100">
                            </div>
                            <div class="modal-body text-center">
                                <h6>${data.message}</h6>
                                <div class="model-footer  m-auto">
                                    <a href="${
                                      window.API_BASE_URL
                                    }/home/plan" id="contactModal2" class="btn btn-primary mb-2 w-50">
                                        <i class="fad fa-phone-alt"></i> Upgrade Weekly Limit
                                    </a>
                                    <p>
                                        <a type="button" data-bs-dismiss="modal"><i class="far fa-times-circle"></i> No</a>
                                    </p>
                                </div>
                            </div>
                        `;
          } else {
            modalContent = `
                            <div class="modal-body text-center">
                                <p class="text-danger">${data.message}</p>
                            </div>
                        `;
          }
          break;
        case 404:
          modalContent = `<p class="text-danger">${
            data.message || "Viewed member not found."
          }</p>`;
          break;
        case 422:
          modalContent = `
                        <div class="modal-body text-center">
                            <p class="text-danger">${
                              data.message || "Validation error."
                            }</p>
                        </div>
                    `;
          break;
        default:
          modalContent = `
                        <div class="modal-body text-center">
                            <p class="text-danger">${
                              data.message || "An unexpected error occurred."
                            }</p>
                            <button class="btn btn-secondary mt-3" data-bs-dismiss="modal">Close</button>
                        </div>
                    `;
          break;
      }

      updateModal(modalContent);
      modal.modal("show"); // Show the modal
    },
    error: function (err) {
      console.error("Error fetching member details:", err);
      alert("Failed to fetch member details. Please try again later.");
    },
  });
}

function GetAadharUrlAndRedirect() {
  performRequest("GetAadharUrl") // Pass the request name or identifier if needed
    .then((data) => {
      // console.log(data);
      if (data.status) {
        const redirectUrl = data.data.result.url;
        // console.log(redirectUrl);
        redirectToDigiLocker(redirectUrl);
      } else {
      }
    })
    .catch((error) => {
      console.error("Error fetching contact details:", error);
      // Handle unexpected errors such as network errors
      document.getElementById("contactDetails").innerHTML =
        '<p class="text-danger">Failed to load contact details.</p>';
    });
}

function redirectToDigiLocker(url) {
  // Check if the URL is valid
  if (url) {
    // Redirect the user to the DigiLocker URL
    window.location.href = url;
  } else {
    console.error("Invalid URL");
  }
}
function ExploreProfileVisitors(memberID) {
  performRequest(
    "View",
    { visited_member_id: memberID },
    {},
    window.API_BASE_URL
  );
}
