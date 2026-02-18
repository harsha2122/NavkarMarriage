// Attach Modal By Button Ids And Member Id
// start
// function loadModelByMemberIDForAvtionButtom(MemberID) {
function loadModelByMemberID(MemberID) {
  const $buttons = $(`[data-profile-id="${MemberID}"]`);
  const buttonIds = [];
  // Loop through each button and get its ID

  // // console.log(buttonIds);

  $buttons.each(function () {
    const buttonId = this.id;
    if (buttonId) {
      buttonIds.push(buttonId);
    }
  });
  // console.log(buttonIds);
  attachModalByButtonIds(buttonIds);
}

// function loadModelByMemberID(MemberID) {
//     const $buttons = $(`[data-profile-id="${MemberID}"]`);
//     const buttonIdsByClass = {};

//     // Loop through each button and get its ID, categorized by class
//     $buttons.each(function() {
//         const buttonId = this.id;
//         const buttonClass = this.className; // Get the class name(s) of the button

//         if (buttonId) {
//             // Split class names and iterate to categorize IDs
//             buttonClass.split(' ').forEach(cls => {
//                 if (!buttonIdsByClass[cls]) {
//                     buttonIdsByClass[cls] = []; // Initialize if it doesn't exist
//                 }
//                 buttonIdsByClass[cls].push(buttonId); // Push the ID to the respective class array
//             });
//         }
//     });

//     // console.log(buttonIdsByClass);
//     attachModalByButtonIds(buttonIdsByClass);
// }

function attachModalById(buttonId, modalId) {
  const $button = $(`#${buttonId}`);
  if ($button.length) {
    // Check if the modal is already attached
    if (!$button.data("modal-attached")) {
      $button.data("modal-attached", true); // Mark the modal as attached
      $button.on("click", function () {
        const $modalElement = $(`#${modalId}`);
        if ($modalElement.length) {
          const profileId = $button.data("profile-id");
          const buttonId = this.id;
          const $modalTitle = $modalElement.find("#modal-title");
          const $modalDescription = $modalElement.find("#modal-description");
          const $acceptButton = $modalElement.find("#accept-button");
          let actionString;

          // Use switch statement for determining the action string based on modalId
          switch (modalId) {
            case "RejectInterestModel":
              actionString = `performRequest('RejectInterest', { from_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            case "AcceptInterestModel":
              actionString = `performRequest('AcceptInterest', { from_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            case "SendInterestModel":
              actionString = `performRequest('SendInterest', { to_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            case "CancelInterestModel":
              actionString = $button.hasClass("InboxCancelInterest")
                ? `performRequest('InboxCancelInterest', { to_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`
                : `performRequest('CancelInterest', { to_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            case "AddToShotlistModel":
              actionString = `performRequest('AddToShotlist', { shortlisted_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            case "RemoveFromShotlistModel":
              actionString = $button.hasClass("InboxRemoveFromShortlist")
                ? `performRequest('InboxRemoveFromShotlist', { shortlisted_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`
                : `performRequest('RemoveFromShotlist', { shortlisted_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            case "IgnoreModel":
              actionString = $button.hasClass("InboxIgnore")
                ? `performRequest('InboxIgnore', { ignored_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`
                : `performRequest('Ignore', { ignored_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            case "RemoveIgnoreModel":
              actionString = $button.hasClass("InboxRemoveIgnore")
                ? `performRequest('InboxRemoveIgnore', { ignored_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`
                : `performRequest('RemoveIgnore', { ignored_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
              break;
            default:
              // console.error('Invalid action type:', modalId);
              return;
          }

          // Set the onclick action for the accept button
          $acceptButton.attr("onclick", actionString);
          const myModal = new bootstrap.Modal($modalElement[0]);
          myModal.show();
        } else {
          // console.error('Modal with ID ' + modalId + ' not found.');
        }
      });
    } else {
      // console.log('Modal already attached to button:', buttonId);
    }
  } else {
    // console.error('Button with ID ' + buttonId + ' not found.');
  }
}

function attachModalByButtonIds(buttonIds) {
  buttonIds.forEach(function (buttonId) {
    const $button = $(`#${buttonId}`);
    let modalId = "";
    if ($button.length) {
      // Use a switch case to map button classes to modal IDs
      switch (true) {
        case $button.hasClass("RejectInterest"):
          modalId = "RejectInterestModel";
          break;
        case $button.hasClass("AcceptInterest"):
          modalId = "AcceptInterestModel";
          break;
        case $button.hasClass("SendInterest"):
          modalId = "SendInterestModel";
          break;
        case $button.hasClass("CancelInterest"):
        case $button.hasClass("InboxCancelInterest"):
          modalId = "CancelInterestModel";
          break;
        case $button.hasClass("AddToShortlist"):
          modalId = "AddToShotlistModel";
          break;
        case $button.hasClass("RemoveFromShortlist"):
        case $button.hasClass("InboxRemoveFromShortlist"):
          modalId = "RemoveFromShotlistModel";
          break;
        case $button.hasClass("Ignore"):
        case $button.hasClass("InboxIgnore"):
          modalId = "IgnoreModel";
          break;
        case $button.hasClass("RemoveIgnore"):
        case $button.hasClass("InboxRemoveIgnore"):
          modalId = "RemoveIgnoreModel";
          break;

        default:
          // console.error('No matching class found for button ID:', buttonId);
          return;
      }
      // console.log([buttonId, modalId]);
      attachModalById(buttonId, modalId);
    } else {
      // console.error('Button with ID ' + buttonId + ' not found.');
    }
  });
}
// End
// Attach Modal By Button Ids And Member Id
//
//
//
//
//
//
//
// Function to handle modal actions based on button class using vanilla JavaScript
function attachModalByClassName(buttonClassName, modalId) {
  document.querySelectorAll(`.${buttonClassName}`).forEach((button) => {
    button.addEventListener("click", () => {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        if (!button.getAttribute("setmodel")) {
          const profileId = button.getAttribute("data-profile-id");
          const buttonId = button.id;
          const acceptButton = modalElement.querySelector("#accept-button");
          let actionString = getActionString(modalId, profileId, buttonId);
          if (actionString) {
            acceptButton.setAttribute("onclick", actionString);
            button.setAttribute("setmodel", "true");
            const myModal = new bootstrap.Modal(modalElement);
            myModal.show();
          }
        }
      } else {
        // console.error(`Modal with ID ${modalId} not found.`);
      }
    });
  });
}
// Function to handle modal actions based on button class using jQuery
function attachModalByClass(buttonClassName, modalId) {
  $(`.${buttonClassName}`).each(function () {
    $(this).on("click", function () {
      const $modalElement = $(`#${modalId}`);
      if ($modalElement.length) {
        if (!$(this).attr("setmodel")) {
          const profileId = $(this).data("profile-id");
          const buttonId = this.id;
          const $acceptButton = $modalElement.find("#accept-button");
          let actionString = getActionString(modalId, profileId, buttonId);
          if (actionString) {
            $acceptButton.attr("onclick", actionString);
            $(this).attr("setmodel", "true");
            const myModal = new bootstrap.Modal($modalElement[0]);
            myModal.show();
          }
        }
      } else {
        // console.error(`Modal with ID ${modalId} not found.`);
      }
    });
  });
}
// Helper function to generate action strings based on modalId
function getActionString(modalId, profileId, buttonId) {
  switch (modalId) {
    case "RejectInterestModel":
      return `performRequest('RejectInterest', { from_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    case "AcceptInterestModel":
      return `performRequest('AcceptInterest', { from_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    case "SendInterestModel":
      return `performRequest('SendInterest', { to_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    case "CancelInterestModel":
      return `performRequest('CancelInterest', { to_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    case "AddToShotlistModel":
      return `performRequest('AddToShotlist', { shortlisted_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    case "RemoveFromShotlistModel":
      return `performRequest('RemoveFromShotlist', { shortlisted_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    case "IgnoreModel":
      return `performRequest('Ignore', { ignored_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    case "RemoveIgnoreModel":
      return `performRequest('RemoveIgnore', { ignored_member_id: ${profileId}, model_id: '${modalId}' }, { memberid: ${profileId}, buttonid: '${buttonId}' })`;
    default:
      // console.error(`Invalid modal ID: ${modalId}`);
      return null;
  }
}
//
//
//
//
//
//
//
//
//
//

function generateInboxShortlistButton(memberId, isShortlisted) {
  return isShortlisted
    ? `<a class="btn btn-small InboxRemoveFromShortlist" id="RemoveFromShortlist${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-times-circle"></i> Shortlisted
           </a>`
    : `<a id="AddToShortlist${memberId}" data-profile-id="${memberId}" class="btn btn-small AddToShortlist">
                <i class="far fa-star"></i> Shortlist
           </a>`;
}

function generateIgnoreButton(memberId, isIgnored) {
  return isIgnored == 0
    ? `<a id="Ignore${memberId}" data-profile-id="${memberId}" class="Ignore">
                <i class="far fa-ban"></i> Ignore
           </a>`
    : `<a class="mt-3 RemoveIgnore" id="RemoveIgnore${memberId}" data-profile-id="${memberId}">
                <i class="far fa-user-unlock"></i> Unblock Now
           </a>`;
}

function generateInboxIgnoreButton(memberId, isIgnored) {
  return isIgnored == 0
    ? `<a id="InboxIgnore${memberId}" data-profile-id="${memberId}" class="btn btn-small Ignore">
                <i class="far fa-ban"></i> InboxIgnore
           </a>`
    : `<a class="btn btn-outline-secondary  mt-3 InboxRemoveIgnore" id="InboxRemoveIgnore${memberId}" data-profile-id="${memberId}">
                <i class="far fa-user-unlock"></i> Unblock Now
           </a>`;
}

// function generateInboxIgnoreButton(memberId, isIgnored) {
//     return isIgnored ?
//         `<a class="btn btn-small RemoveIgnore" id="RemoveIgnore${memberId}" data-profile-id="${memberId}">
//                 <i class="fal fa-times-circle"></i> Remove From Ignore
//            </a>` :
//         `<a id="Ignore${memberId}" data-profile-id="${memberId}" class="btn btn-small Ignore">
//                 <i class="far fa-ban"></i> Ignore
//            </a>`;
// }

function generateConnectButton(memberId) {
  return `<a href="${window.API_BASE_URL}/home/member-detail/${memberId}" class="btn btn-success ConnectNow" id="ConnectNow${memberId}" data-profile-id="${memberId}">
                <i class="fas fa-phone-alt"></i> View Contact
           </a>`;
}

function generateAcceptButton(memberId) {
  // alert(`AcceptInterest${memberId}`)
  return `<a class="btn btn-outline-danger AcceptInterest" id="AcceptInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-user-check"></i> Accept Interest
           </a>`;
}

function generateAcceptButtonNotificationList(memberId) {
  return `<a class=" AcceptInterest" id="AcceptInterest${memberId}" data-profile-id="${memberId}">
                 Accept Interest
            </a>`;
}

function generateAcceptedButton() {
  return `<a class="btn btn-outline-danger">
                <i class="fal fa-user-check"></i> Accepted
            </a>`;
}

function generatePendingButton() {
  return `<a class="btn btn-outline-danger">
                <i class="fad fa-circle-notch"></i> Pending
            </a>`;
}

function generateRejectButton(memberId) {
  return `<a class="btn btn-outline-danger RejectInterest" id="RejectInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-times-circle"></i> Decline Interest
            </a>`;
}

function generateSendButton(memberId) {
  // // console.log(`AcceptInterest  // ${memberId} //`);
  return `<a id="SendInterest${memberId}" data-profile-id="${memberId}" class="SendInterest btn btn-primary">
                <i class="far fa-heart"></i> Send Interest
            </a>`;
}

function generateCancelButton(memberId) {
  return `<a class="btn btn-outline-secondary CancelInterest" id="CancelInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-times-circle"></i> Cancel Interest
            </a>`;
}

function generateInboxCancelButton(memberId) {
  return `<a class="btn btn-outline-secondary InboxCancelInterest" id="CancelInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-times-circle"></i> Cancel Interest
            </a>`;
}

function generateBlockButton(memberId, isBlocked) {
  return isBlocked
    ? `<a class="btn btn-outline-secondary RemoveIgnore mt-3" id="RemoveIgnore${memberId}" data-profile-id="${memberId}">
                <i class="far fa-user-unlock"></i> Unblock Now
           </a>`
    : `<a class="btn btn-outline-danger Ignore mt-3" id="Ignore${memberId}" data-profile-id="${memberId}">
                <i class="far fa-times-circle"></i> Ignore this Profile
           </a>`;
}

function loadInterestButtonsWithHeading(
  memberId,
  interestReceivedStatus,
  interestSentStatus
) {
  let heading = "";
  let buttons = "";

  if (interestReceivedStatus === "1") {
    heading =
      "<p>You received their interest. You can now respond to this profile.</p>";
    buttons = generateAcceptButton(memberId) + generateRejectButton(memberId);
  } else if (interestReceivedStatus === "2") {
    heading =
      "<p>You rejected their interest. This profile cannot be connected with at the moment.</p>";
    buttons = generateAcceptButton(memberId);
  } else if (interestReceivedStatus === "3") {
    heading =
      "<p>You accepted their interest. Now you can connect with this profile.</p>";
    buttons = generateAcceptedButton();
  } else {
    if (interestSentStatus === "3") {
      heading =
        "<p>They accepted your interest. You can now connect with this profile.</p>";
      buttons = generateAcceptedButton();
    } else if (interestSentStatus === "1") {
      heading =
        "<p>They declined your invitation. This member cannot be contacted.</p>";
      buttons = generateCancelButton(memberId);
    } else if (interestSentStatus === "2") {
      heading =
        "<p>They declined your invitation. This member cannot be contacted.</p>";
      // buttons = generateCancelButton(memberId);
    } else {
      //     <p>Liking this profile? </p>

      heading = `<p><strong> Like this Profile?</strong><br>
            Take the first step towards a meaningful connection!</p>`;
      buttons = generateSendButton(memberId);
    }
  }

  return `${heading}${buttons}`;
}

function loadExplorelListInterestButtonsWithHeading(
  memberId,
  interestReceivedStatus,
  interestSentStatus
) {
  let heading = "";
  let buttons = "";

  if (interestReceivedStatus === "1") {
    heading = "<p></p>";
    buttons = `
        <a class="btn btn-outline-danger openPlanModalBtn" id="AcceptInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-user-check"></i> Accept Interest
           </a>
           <a class="btn btn-outline-danger openPlanModalBtn" id="RejectInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-times-circle"></i> Decline Interest
            </a>
        `;
  } else if (interestReceivedStatus === "2") {
    heading = "<p></p>";
    buttons = `<a class="btn btn-outline-danger openPlanModalBtn" id="AcceptInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-user-check"></i> Accept Interest
           </a>`;
  } else if (interestReceivedStatus === "3") {
    heading =
      "<p>You rejected their interest. This profile cannot be connected with at the moment.</p>";
    buttons = `<a class="btn btn-outline-danger openPlanModalBtn">
                <i class="fal fa-user-check"></i> Accepted
            </a>`;
  } else {
    if (interestSentStatus === "3") {
      heading = "<p></p>";
      buttons = `<a class="btn btn-outline-danger openPlanModalBtn">
                <i class="fal fa-user-check"></i> Accepted
            </a>`;
    } else if (interestSentStatus === "1") {
      heading = "<p></p>";
      buttons = `<a class="btn btn-outline-secondary openPlanModalBtn CancelInterest" id="CancelInterest${memberId}" data-profile-id="${memberId}">
                <i class="fal fa-times-circle"></i> Cancel Interest
            </a>`;
    } else if (interestSentStatus === "2") {
      heading =
        "<p>They declined your invitation. This member cannot be contacted.</p>";
      // buttons = generateCancelButton(memberId);
    } else {
      //     <p>Liking this profile? </p>

      heading = `<p><strong> Like this Profile?</strong><br>
            Take the first step towards a meaningful connection!</p>`;
      buttons = `<a id="SendInterest${memberId}" data-profile-id="${memberId}" class="SendInterest  openPlanModalBtn btn btn-primary">
                <i class="far fa-heart"></i> Send Interest
            </a>`;
    }
  }

  return `${heading}${buttons}`;
}

function loadInboxInterestButton(memberId, interestSentStatus) {
  if (interestSentStatus === null) {
    return generateSendButton(memberId);
  } else if (interestSentStatus === "1") {
    return generateInboxCancelButton(memberId);
  } else if (interestSentStatus === "3") {
    return generateAcceptedButton();
  }
}

function loadReceivedInterestButton(
  memberId,
  interestReceivedStatus,
  interestSentStatus,
  isInbox = false
) {
  if (interestReceivedStatus === null) {
    return isInbox
      ? loadInboxInterestButton(memberId, interestSentStatus)
      : loadInterestButtonsWithHeading(
          memberId,
          interestReceivedStatus,
          interestSentStatus
        );
  } else if (interestReceivedStatus === "1") {
    return generateAcceptButton(memberId) + generateRejectButton(memberId);
  } else if (interestReceivedStatus === "2") {
    return generateAcceptButton(memberId);
  } else if (interestReceivedStatus === "3") {
    return generateAcceptedButton();
  }
}

function generateShortlistButton(Shortlist, member_id) {
  if (Shortlist) {
    return `
    <a class="btn btn-small" id="RemoveFromShortlist${member_id}" 
       onclick="performRequest('RemoveFromShotlist', { shortlisted_member_id: ${member_id} }, { memberid: ${member_id}, buttonid: 'RemoveFromShortlist${member_id}' })" 
       data-profile-id="${member_id}">
        <i class="fal fa-times-circle"></i> Shortlisted
    </a>`;
  } else {
    return `
    <a id="AddToShortlist${member_id}" 
       onclick="performRequest('AddToShotlist', { shortlisted_member_id: ${member_id} }, { memberid: ${member_id}, buttonid: 'AddToShortlist${member_id}' })" 
       data-profile-id="${member_id}" class="btn btn-small">
        <i class="far fa-star"></i> Shortlist
    </a>`;
  }
}

function getFixImagePath(imageName) {
  return window.ASSET_PATH + "/assets/frontend/img/" + imageName;
}
// Usage example
// const result = loadInterestButtonsWithHeading(memberId, interestReceivedStatus, interestSentStatus);
function generateUnblockButton(member_id) {
  return `<a class="btn btn-outline-secondary RemoveIgnore mt-3" 
                onclick="performRequest('RemoveIgnore', { ignored_member_id: ${member_id} })">
                <i class="far fa-user-unlock"></i> Unblock Now
            </a>`;
}
