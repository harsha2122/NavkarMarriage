function submitSearchFilterForm(url, type, containerID, ListKey, formID) {
  let formData;
  // Check if formID is provided
  if (formID === "") {
    // console.log('No form ID provided. Sending empty formData.');
    formData = new FormData(); // Create an empty FormData object
  } else {
    const form = document.getElementById(formID);
    if (!form) {
      // console.error('Form not found with ID:', formID);
      return;
    }
    formData = new FormData(form);
    // Log FormData key-value pairs for debugging
    // console.log('Original Form Data:');
    for (const [key, value] of formData.entries()) {
      // console.log(key, value);
    }
    // Remove keys with null, undefined, or empty string values
    for (const [key, value] of formData.entries()) {
      if (value === null || value === "null" || value === "") {
        formData.delete(key); // Remove the key from FormData
      }
    }
    // console.log('Filtered Form Data:');
    for (const [key, value] of formData.entries()) {
      // console.log(key, value);
    }
  }
  // Ensure fetchAndRenderData is defined and called correctly
  if (typeof fetchAndRenderData === "function") {
    fetchAndRenderData(url, type, containerID, ListKey, formID, formData);
  } else {
    // console.error('fetchAndRenderData function is not defined');
  }
}
function fetchAndRenderData(
  url,
  type,
  containerID,
  ListKey = "",
  formID = "",
  formData = {}
) {
  const headers = {
    Authorization: `Bearer ${getToken("JwtApiToken")}`,
    "Content-Type": "multipart/form-data",
  };
  axios
    .post(url, formData, { headers })
    .then((response) => {
      const { data, paginator } = response.data.data;
      // Visibility and number update based on paginator total count
      const total = response.data.data.paginator.total;
      hideViewAllById(containerID, total);
      hideParentById(containerID, total);
      updateTotalNumber(containerID, total);
      scrollToElementById("#ScroleToThisWhenPageChange");
      // Load data based on 'type'
      switch (type) {
        case "ProfileList1":
          loadProfileList1(data, containerID);
          break;
        case "ExploreProfileList1":
          console.log("this is Working");
          loadExploreProfileList1(data, containerID);
          $(containerID).siblings(".ViewAllSection").hide();
          break;
        case "ProfileList2":
          loadProfileList2(data, containerID);
          generatePagination(
            paginator,
            type,
            containerID,
            ListKey,
            formID,
            "Member_List_Paginator_Container"
          );
          break;
        case "ProfileExploreList2":
          loadProfileExploreList2(data, containerID);
          generatePagination(
            paginator,
            type,
            containerID,
            ListKey,
            formID,
            "Member_List_Paginator_Container"
          );
          // Call the function with the class name of buttons and modal ID
          break;
        case "ProfileList3":
          loadProfileList3(data, containerID);
          break;
        case "ProfileList5":
          loadProfileList5(data, containerID);
          break;
        case "InboxProfileList":
          if (ListKey === "getRejected") {
            loadInboxProfileList2(data, containerID, ListKey);
            generatePagination(
              paginator,
              type,
              containerID,
              ListKey,
              formID,
              "Member_List_Paginator_Container"
            );
          } else if (ListKey === "otherviewMe" || ListKey === "meviewother") {
            loadProfileList2(data, containerID, ListKey);
            generatePagination(
              paginator,
              type,
              containerID,
              ListKey,
              formID,
              "Member_List_Paginator_Container"
            );
          } else {
            loadInboxProfileList(data, containerID, ListKey);
            generatePagination(
              paginator,
              type,
              containerID,
              ListKey,
              formID,
              "Member_List_Paginator_Container"
            );
          }
          break;
        case "Single_serch_on_advanced_search_from":
          const memberData = data[0];
          if (memberData) {
            redirectToMemberDetailsPage(memberData);
          } else {
            createToast("info", "No member available.");
          }
          break;
        case "Navbar_notification":
          Navbar_notification(data, containerID);
          break;
        default:
          console.warn("Unknown type:", type);
          break;
      }
      scrollToElement(containerID);
    })
    .catch((error) => {
      // console.error('Error:', error);
      createToast("error", `Error fetching data: ${error.message}`);
    });
}
function fetchAndRenderDataHome(
  url,
  type,
  containerID,
  ListKey = "",
  formID = "",
  formData = {}
) {
  const headers = {
    // 'Authorization': `Bearer ${getToken('JwtApiToken')}`,
    // 'Content-Type': 'multipart/form-data'
  };
  // console.log(formData);
  axios
    .post(url, formData, { headers })
    .then((response) => {
      // console.log(response);
      // console.log(response.data.data.paginator.total);
      // console.log(response.data.data);
      hideParentById(containerID, response.data.data.paginator.total);
      hideViewAllById(containerID, response.data.data);
      updateTotalNumber(containerID, response.data.data.paginator.total);
      scrollToElementById(containerID + "_total_Count");
      // Assuming 'type' is a field in your response data
      switch (type) {
        case "ProfileList2Home":
          loadProfileList2Home(response.data.data.data, containerID);
          generatePagination(
            response.data.data.paginator,
            type,
            containerID,
            ListKey,
            formID,
            "Member_List_Paginator_Container"
          );
          break;
        case "ExploreProfileList2Home":
          loadExploreProfileList2Home(response.data.data.data, containerID);
          generatePagination(
            response.data.data.paginator,
            type,
            containerID,
            ListKey,
            formID,
            "Member_List_Paginator_Container"
          );
          break;
        default:
          // Handle unknown or unspecified type
          console.warn("Unknown type:", response.data.type);
          // alert('Unknown type: ' + response.data.message);
          break;
      }
    })
    .catch((error) => {
      // console.error('Error:', error);
      // alert('Error: ' + error.message);
    });
}
function handelPageChang(formID, url, functionName) {
  // alert("This work")
  switch (functionName) {
    case "changeUrlAndSubmit":
      changeUrlAndSubmit(url, formID);
      break;
    case "changepage":
      changepage(url);
      break;
    default:
      console.warn(`No function found for: ${functionName}`);
      break;
  }
}
function hideParentById(id, totle) {
  // Check if totle is 0
  if (totle == 0) {
    // Use jQuery to select the element by ID and find its closest ancestor with the specified class
    $(id).closest(".Member_List_Container").hide();
  }
}
function hideViewAllById(id, totle) {
  // Check if the total is less than 5
  if (totle < 5) {
    // Use jQuery to find the closest '.ViewAllSection' and hide it
    $(id).siblings(".ViewAllSection").hide();
  }
}
function loadProfileList1(profileData, containerID) {
  // The container where the profiles will be inserted
  const container = $(containerID);
  // Clear the container before adding new profiles
  container.empty();
  // Limit the number of profiles to 5
  const limitedData = profileData.slice(0, 4);
  // Loop through each profile in the limited data
  limitedData.forEach((profile) => {
    // Create the HTML for the profile
    const profileHTML = `
            <div class="col-md-3">
                <div class="bg-light">
                <div class="visit-img">
                <a href="${
                  window.API_BASE_URL +
                  "/home/member-detail/" +
                  profile.member_id
                }" class="Only_Link" >
                    <img src="${getImagePath(
                      profile.photoName,
                      "default-boy.png"
                    )}" class="img-fluid">
                    </a>
                </div>
                    <h3>${profile.short_name} </h3>
                    <p>${profile.age} Yrs, ${profile.height || "N/A"}</p>
                    <p>${profile.present_city_name}, ${
      profile.marital_status
    }</p>
                    <p> ${profile.education}</p>
                    <a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link connect-now mt-2"> View Profile </a>
                </div>
            </div>
        `;
    // <p>${profile.annual_income}</p>
    // Append the generated HTML to the container
    container.append(profileHTML);
  });
}
function loadExploreProfileList1(profileData, containerID) {
  // The container where the profiles will be inserted
  const container = $(containerID);
  // Clear the container before adding new profiles
  container.empty();
  // Limit the number of profiles to 5
  const limitedData = profileData;
  // Loop through each profile in the limited data
  limitedData.forEach((profile) => {
    // Create the HTML for the profile
    const profileHTML = `
            <div class="col-md-3">
                <div class="bg-light">
                <div class="visit-img">
                <a href="#PlanContainer" class="Only_Link" >
                    <img src="${getImagePath(
                      profile.photoName,
                      "default-boy.png"
                    )}" class="img-fluid">
                    </a>
                </div>
                    <h3>${profile.short_name} </h3>
                    <p>${profile.age} Yrs, ${profile.height || "N/A"}</p>
                    <p>${profile.present_city_name}, ${
      profile.marital_status
    }</p>
                    <p> ${profile.education}</p>
                    <a href="#PlanContainer" class="Only_Link connect-now mt-2"> View Profile </a>
                </div>
            </div>
        `;
    // Append the generated HTML to the container
    container.append(profileHTML);
  });
}
// src="{{ isset($photo[0]) ? asset('storage/images/' . $photo[0]['photo_name']) : asset('assets/frontend/img/user.png') }}"
function loadProfileList2(profileData, containerID) {
  const container = $(containerID);
  // Clear the container before adding new profile
  container.empty();
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    // console.log(profile);
    // Determine badge images
    let premiumBadge = "";
    let documentVerified = "";
    if (profile.is_premium === "1") {
      premiumBadge = `<img src="${getFixImagePath("premium.png")}">`;
    }
    if (profile.is_Document_Verification == "1") {
      documentVerified = `<img src="${getFixImagePath(
        "verifi-green.png"
      )}" width="22" data-bs-toggle="tooltip" data-bs-placement="top" title="Contact Verified" data-bs-customClass="custom-tooltip">`;
    }
    // Generate profile card HTML
    const profileHTML = `
        <div class="user-list Parent_Class shadow row mb-5" >
                <div class="col-md-4 p-2">
                <a href="${
                  window.API_BASE_URL +
                  "/home/member-detail/" +
                  profile.member_id
                }" class="Only_Link" >
                    <div class="list-img">
                       <span class="premimun-tag"> ${premiumBadge}
                       </span> 
                        <img src="${getImagePath(
                          profile.photoName,
                          "default-boy.png"
                        )}" class="img-fluid"> 
                    </div>
                    </a>
                </div>
                <div class="col-md-5 memb-content">
                    <small>${getLastSeenDataTime(profile.last_online)}</small>
                    <h3><a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" >${
      profile.member_name
    }  <span>${documentVerified}</span> </a></h3>
                    <h4>  <a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" ><span>Member ID </span> - ${
      profile.member_profile_id || "ID"
    }</a></h4>
                    <div class="d-flex justify-content-start">
                        <p>${profile.age} Yrs  , ${profile.height || "N/A"}</p>
                        <p> | </p>
                        <p> &nbsp;&nbsp;${profile.marital_status}</p>
                    </div>
                       <div class="d-flex justify-content-start">
                        <p>${profile.section}, ${profile.caste}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.present_city_name} | ${
      profile.permanent_city_name
    } | ${profile.education}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.occupation}</p>
                        <p>  &nbsp;| &nbsp; </p>
                        <p>${profile.annual_income}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <a href="${window.API_BASE_URL}/home/member-detail/${
      profile.member_id
    }" class="btn btn-small"><i class="far fa-user"></i> View Profile</a>
                        ${generateShortlistButton(
                          profile.Shortlisted,
                          profile.member_id
                        )}
                        </div>
                </div>
                <div class="col-md-3 intrest-sec">
                    ${loadInterestButtonsWithHeading(
                      profile.member_id,
                      profile.interest_received_status,
                      profile.interest_sent_status
                    )}                  
                </div>
        </div>
        `;
    // Append the generated HTML to the container
    container.append(profileHTML);
    loadModelByMemberID(profile.member_id);
  });
}
// src="{{ isset($photo[0]) ? asset('storage/images/' . $photo[0]['photo_name']) : asset('assets/frontend/img/user.png') }}"
function loadProfileList2Home(profileData, containerID) {
  const container = $(containerID);
  // Clear the container before adding new profile
  container.empty();
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    let premiumBadge = "";
    let documentVerified = "";
    if (profile.is_premium === "1") {
      premiumBadge = `<img src="${getFixImagePath("premium.png")}">`;
    }
    if (profile.is_approved === "1") {
      documentVerified = `<img src="${getFixImagePath(
        "verifi-green.png"
      )}" width="22" data-bs-toggle="tooltip" data-bs-placement="top" title="Contact Verified" data-bs-customClass="custom-tooltip">`;
    }
    // Generate profile card HTML
    const profileHTML = `
        <div class="user-list Parent_Class shadow row mb-5" >
                <div class="col-md-4 p-2">
                <a href="${
                  window.API_BASE_URL + "/registration#Registration_Form"
                }" class="Only_Link" >
                    <div class="list-img">
                       <span class="premimun-tag"> ${premiumBadge}
                       </span> 
                        <img src="${getImagePath(
                          profile.photoName,
                          "default-boy.png"
                        )}" class="img-fluid"> 
                    </div>
                    </a>
                </div>
                <div class="col-md-5 memb-content">
                    <h4>  <a href="${
                      window.API_BASE_URL + "/registration#Registration_Form"
                    }" class="Only_Link" ><span>Member ID </span> - ${
      profile.member_profile_id || "ID"
    }<span>${documentVerified}</span></a></h4>
                    <div class="d-flex justify-content-start">
                        <p>${profile.age} Yrs  , ${profile.height || "N/A"}</p>
                        <p> | </p>
                        <p> &nbsp;&nbsp;${profile.marital_status}</p>
                    </div>
                       <div class="d-flex justify-content-start">
                        <p>${profile.section}, ${profile.caste}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.present_city_name} | ${
      profile.permanent_city_name
    } | ${profile.education}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.occupation}</p>
                        <p>  &nbsp;| &nbsp; </p>
                        <p>${profile.annual_income}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <a href="${
                          window.API_BASE_URL
                        }/registration#Registration_Form" class="btn btn-small"><i class="far fa-user"></i> View Profile</a>
                        <a href="${
                          window.API_BASE_URL
                        }/registration#Registration_Form" class="btn btn-small"><i class="far fa-star"></i> Shortlist</a>
                        </div>
                </div>
                <div class="col-md-3 intrest-sec">
                    <p class="d-none  d-sm-block">Liking this profile? </p>
                    <p class="p-2 d-none  d-sm-block"><img src="${getFixImagePath(
                      "intrest.png"
                    )}"></p>
                    <a href="${
                      window.API_BASE_URL
                    }/registration#Registration_Form"  class="SendInterest btn btn-primary">
                        <i class="far fa-heart"></i> Send Interest
                    </a>
                </div>
        </div>
        `;
    // <p>${profile.permanent_city_name}, ${profile.marital_status}, ${profile.occupation}</p>
    // Append the generated HTML to the container
    container.append(profileHTML);
    loadModelByMemberID(profile.member_id);
  });
}
// src="{{ isset($photo[0]) ? asset('storage/images/' . $photo[0]['photo_name']) : asset('assets/frontend/img/user.png') }}"
function loadProfileExploreList2(profileData, containerID) {
  const container = $(containerID);
  // Clear the container before adding new profile
  container.empty();
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    // console.log(profile);
    // Determine badge images
    let premiumBadge = "";
    let documentVerified = "";
    if (profile.is_premium === "1") {
      premiumBadge = `<img src="${getFixImagePath("premium.png")}">`;
    }
    if (profile.is_Document_Verification == "1") {
      documentVerified = `<img src="${getFixImagePath(
        "verifi-green.png"
      )}" width="22" data-bs-toggle="tooltip" data-bs-placement="top" title="Contact Verified" data-bs-customClass="custom-tooltip">`;
    }
    // Generate profile card HTML
    const profileHTML = `
        <div class="user-list Parent_Class shadow row mb-5" >
                <div class="col-md-4 p-2">
                <a href="${
                  window.API_BASE_URL +
                  "/home/member-detail/" +
                  profile.member_id
                }" class="Only_Link" >
                    <div class="list-img">
                       <span class="premimun-tag"> ${premiumBadge}
                       </span> 
                        <img src="${getImagePath(
                          profile.photoName,
                          "default-boy.png"
                        )}" class="img-fluid"> 
                    </div>
                    </a>
                </div>
                <div class="col-md-5 memb-content">
                    <small>${getLastSeenDataTime(profile.last_online)}</small>
                    <h3><a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" >${
      profile.member_name
    }  <span>${documentVerified}</span> </a></h3>
                    <h4>  <a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" ><span>Member ID </span> - ${
      profile.member_profile_id || "ID"
    }</a></h4>
                    <div class="d-flex justify-content-start">
                        <p>${profile.age} Yrs  , ${profile.height || "N/A"}</p>
                        <p> | </p>
                        <p> &nbsp;&nbsp;${profile.marital_status}</p>
                    </div>
                       <div class="d-flex justify-content-start">
                        <p>${profile.section}, ${profile.caste}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.present_city_name} | ${
      profile.permanent_city_name
    } | ${profile.education}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.occupation}</p>
                        <p>  &nbsp;| &nbsp; </p>
                        <p>${profile.annual_income}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <a ${
                          window.MEMBER_TYPE == "Free"
                            ? 'class="btn btn-small openPlanModalBtn"'
                            : 'href="${window.API_BASE_URL}/home/member-detail/${profile.member_id}"  class="btn btn-small" '
                        }><i class="far fa-user"></i> View Profile</a>
                        ${generateShortlistButton(
                          profile.Shortlisted,
                          profile.member_id
                        )}
                        </div>
                </div>
                <div class="col-md-3 intrest-sec">
                    ${loadExplorelListInterestButtonsWithHeading(
                      profile.member_id,
                      profile.interest_received_status,
                      profile.interest_sent_status
                    )}
                </div>
                </div>
                `;
    // ${window.MEMBER_TYPE == 'Free' ? loadExplorelListInterestButtonsWithHeading(profile.member_id, profile.interest_received_status, profile.interest_sent_status) : loadInterestButtonsWithHeading(profile.member_id, profile.interest_received_status, profile.interest_sent_status)}
    // Append the generated HTML to the container
    container.append(profileHTML);
    // loadModelByMemberID(profile.member_id);
  });
  initializeModalTriggers(".openPlanModalBtn", "myPlanModal");
}
// src="{{ isset($photo[0]) ? asset('storage/images/' . $photo[0]['photo_name']) : asset('assets/frontend/img/user.png') }}"
function loadExploreProfileList2Home(profileData, containerID) {
  const container = $(containerID);
  // Clear the container before adding new profile
  container.empty();
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    let premiumBadge = "";
    let documentVerified = "";
    if (profile.is_premium === "1") {
      premiumBadge = `<img src="${getFixImagePath("premium.png")}">`;
    }
    if (profile.is_approved === "1") {
      documentVerified = `<img src="${getFixImagePath(
        "verifi-green.png"
      )}" width="22" data-bs-toggle="tooltip" data-bs-placement="top" title="Contact Verified" data-bs-customClass="custom-tooltip">`;
    }
    // Generate profile card HTML
    const profileHTML = `
           <div class="desk-list bride-list">
                   <a href="#PlanContainer" onClick="ExploreProfileVisitors('${
                     profile.member_id
                   }')">
                        <div class="listing-box">
                            <img src="${getImagePath(
                              profile.photoName,
                              "default-boy.png"
                            )}" loading="lazy" alt="profile" class="listing-photo ">
                            <div class="overlay user-content text-center">
                                <h4>Profile ID - ${
                                  profile.member_profile_id
                                }</h4>
                                <div class="row">
                                    <div class="col-12 pb-4">
                                        <p>${profile.age} Yrs  , ${
      profile.height || "N/A"
    } ,  ${profile.marital_status}</p>

                                        <p${profile.present_city_name} | ${
      profile.annual_income
    } </p>
                                        
                                        <p>${profile.caste} | ${
      profile.present_city_name
    }  </p>

                                        <p>${profile.occupation} | ${
      profile.annual_income
    }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
        `;
    // <div class="buttons pb-3">
    //                 <div class="text-center">
    //                     <a href="#PlanContainer" class="btn btn_interest">
    //                         <i class="far fa-heart"></i>Connect Now
    //                     </a>
    //                 </div>
    //             </div>
    // <p>${profile.permanent_city_name}, ${profile.marital_status}, ${profile.occupation}</p>
    // Append the generated HTML to the container
    container.append(profileHTML);
    loadModelByMemberID(profile.member_id);
  });
}
// <h3><a href="${window.API_BASE_URL+'/registration#Registration_Form'}" class="Only_Link" >${profile.member_profile_id}  <span>${ documentVerified }</span> </a></h3>
function loadInboxProfileList(profileData, containerID, listKey) {
  const container = $(containerID);
  // Clear the container before adding new profile
  container.empty();
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    // Determine badge images
    let premiumBadge = "";
    let documentVerified = "";
    let intrest_action_section = getInnerHTMLByKey(listKey, profile);
    if (profile.is_premium === "1") {
      premiumBadge = `<img src="${getFixImagePath("premium.png")}">`;
    }
    if (profile.is_approved === "1") {
      documentVerified = `<img src="${getFixImagePath(
        "verifi-green.png"
      )}"  width="22">`;
    }
    const profileHTML = `
        <div class="user-list Parent_Class shadow row mt-5">
            <div class="col-md-4 p-2">
                <a href="${
                  window.API_BASE_URL +
                  "/home/member-detail/" +
                  profile.member_id
                }" class="Only_Link" >
                    <div class="list-img">
                       <span class="premimun-tag"> ${premiumBadge}
                       </span> 
                        <img src="${getImagePath(
                          profile.photoName,
                          "default-boy.png"
                        )}" class="img-fluid"> 
                    </div>
                    </a>
                </div>
                <div class="col-md-5 memb-content">
                    <small>${getLastSeenDataTime(profile.last_online)}</small>
                    <h3><a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" >${
      profile.member_name
    }  <span>${documentVerified}</span> </a></h3>
                    <h4>  <a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" ><span>Member ID </span> - ${
      profile.member_profile_id || "ID"
    }</a></h4>
                    <div class="d-flex justify-content-start">
                        <p>${profile.age} Yrs  , ${profile.height || "N/A"}</p>
                        <p> | </p>
                        <p> &nbsp;&nbsp;${profile.marital_status}</p>
                    </div>
                       <div class="d-flex justify-content-start">
                        <p>${profile.section}, ${profile.caste}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.present_city_name} | ${
      profile.permanent_city_name
    } | ${profile.education}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.occupation}</p>
                        <p>  &nbsp;| &nbsp; </p>
                        <p>${profile.annual_income}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <a href="${window.API_BASE_URL}/home/member-detail/${
      profile.member_id
    }" class="btn btn-small"><i class="far fa-user"></i> View Profile</a>
                        ${generateShortlistButton(
                          profile.Shortlisted,
                          profile.member_id
                        )}
                        </div>
                </div>
                    ${intrest_action_section}
            </div>
        </div>
        `;
    // Append the generated HTML to the container
    container.append(profileHTML);
    loadModelByMemberID(profile.member_id);
  });
}
function loadInboxProfileList2(profileData, containerID, listKey) {
  const container = $(containerID);
  // Clear the container before adding new profile
  container.empty();
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    let premiumBadge = "";
    let documentVerified = "";
    let intrest_action_section = getInnerHTMLByKey(listKey, profile);
    if (profile.is_premium === "1") {
      premiumBadge = `<img src="${getFixImagePath("premium.png")}">`;
    }
    if (profile.is_approved === "1") {
      documentVerified = `<img src="${getFixImagePath(
        "verifi-green.png"
      )}"  width="22">`;
    }
    const profileHTML = `
        <div class="user-list shadow row mt-5">
            <div class="col-md-4 p-2">
                <a href="${
                  window.API_BASE_URL +
                  "/home/member-detail/" +
                  profile.member_id
                }" class="Only_Link" >
                    <div class="list-img">
                       <span class="premimun-tag"> ${premiumBadge}
                       </span> 
                        <img src="${getImagePath(
                          profile.photoName,
                          "default-boy.png"
                        )}" alt="Navkar Marriage Bureau : Jain Shwetamber-Digambar Bride-Groom Profile Picture" class="img-fluid"> 
                    </div>
                    </a>
                </div>
                <div class="col-md-5 memb-content">
                    <small>${getLastSeenDataTime(profile.last_online)}</small>
                    <h3><a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" >${
      profile.member_name
    }  <span>${documentVerified}</span> </a></h3>
                    <h4>  <a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link" ><span>Member ID </span> - ${
      profile.member_profile_id || "ID"
    }</a></h4>
                    <div class="d-flex justify-content-start">
                        <p>${profile.age} Yrs  , ${profile.height || "N/A"}</p>
                        <p> | </p>
                        <p> &nbsp;&nbsp;${profile.marital_status}</p>
                    </div>
                       <div class="d-flex justify-content-start">
                        <p>${profile.section}, ${profile.caste}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.present_city_name} | ${
      profile.permanent_city_name
    } | ${profile.education}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p>${profile.occupation}</p>
                        <p>  &nbsp;| &nbsp; </p>
                        <p>${profile.annual_income}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <a href="${window.API_BASE_URL}/home/member-detail/${
      profile.member_id
    }" class="btn btn-small"><i class="far fa-user"></i> View Profile</a>
                        ${generateShortlistButton(
                          profile.Shortlisted,
                          profile.member_id
                        )}
                        </div>
                </div>
                    ${intrest_action_section}
            </div>
        </div>
        `;
    // Append the generated HTML to the container
    container.append(profileHTML);
    loadModelByMemberID(profile.member_id);
  });
}
function loadProfileList3(profileData, containerID) {
  const container = $(containerID);
  // Clear the container before adding new profiles
  container.empty();
  profileData = profileData.slice(0, 4);
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    // Determine badge images
    let verificationBadge = "";
    // let premiumBadge = '';
    if (profile.is_Verified === "1") {
      verificationBadge = `<img src="${getFixImagePath(
        "verifi-green.png"
      )}" width="20">`;
    }
    // if (profile.is_premium === '1') {
    //     premiumBadge = `<img src="${getFixImagePath('premium.png')}">`;
    // }
    // Generate profile card HTML
    const profileHTML = `
            <div class="col-md-3">
                <div class="bg-light">
                <div class="list-img">
                    <img src="${getImagePath(
                      profile.photoName,
                      "default-boy.png"
                    )}" class="img-fluid">
                      </div>
                    <h4>${profile.member_profile_id || "Member ID"} 
                        <span>${verificationBadge}</span>
                    </h4>
                    <div class="">
                        <p>${profile.age} Yrs  , ${profile.height || "N/A"} | ${
      profile.marital_status
    }</p>
                    </div>
                    <div class="">
                         <P> ${profile.section}, ${profile.caste}</p>
                    </div>
                    <div class="">
                         <p>${profile.present_city_name} | ${
      profile.permanent_city_name
    } | ${profile.education}</p>
                    </div>
                    <a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link"><i class="far fa-heart"></i> View Now</a>
                </div>
            </div>
        `;
    // Append the generated HTML to the container
    container.append(profileHTML);
    // loadModelByMemberID(profile.member_id);
  });
}
let currentPage = 1; // Track the current page for pagination
// Function to load profiles
function loadProfileList4(profileData, containerID) {
  const container = $(containerID);
  // Loop through each profile in the data
  profileData.forEach((profile) => {
    // Generate profile card HTML
    const profileHTML = `
            <div class="mem-list mb-3">
                <div class="userImg text-left">
                    <img src="${getImagePath(
                      profile.photoName,
                      "default-boy.png"
                    )}" class="img-fluid">
                </div>
                <div class="pt-3">
                    <h3>${profile.short_name}</h3>
                    <div class="d-flex online-text">
                        <p>Online</p>
                        <a href="javascript:void(0)" data-bs-container="body">
                            <div class="online"></div>
                        </a>
                    </div>
                    <a href="${
                      window.API_BASE_URL +
                      "/home/member-detail/" +
                      profile.member_id
                    }" class="Only_Link"><i class="far fa-heart"></i> View Now</a>
                </div>
            </div><hr>
        `;
    // Append the generated HTML to the container
    container.append(profileHTML);
  });
}
// Function to fetch data from API
function fetchProfiles(page) {
  $.ajax({
    url: `${window.API_BASE_URL}/api/member/online?page=${page}`,
    method: "GET",
    success: function (response) {
      // Extract the profile data and pagination info from the response
      const onlineData = response.data.data;
      const paginator = response.data.paginator;
      // Load the profiles into the container
      loadProfileList4(onlineData, "#online_member");
      // Check if there are more pages to load
      if (paginator.next_page_url) {
        currentPage++;
      } else {
        // No more pages, remove scroll event to stop loading
        $(window).off("scroll", handleScroll);
      }
    },
    error: function (xhr) {
      // console.error('Error fetching profiles:', xhr);
    },
  });
}
// Scroll event listener for #online_member container
$("#online_member").on("scroll", function () {
  const $container = $(this);
  if (
    $container.scrollTop() + $container.innerHeight() >=
    $container[0].scrollHeight - 100
  ) {
    // Check if there are more pages to load
    if (currentPage < totalPages) {
      currentPage++;
      fetchProfiles(currentPage);
    }
  }
});
function Navbar_notification(notifications, containerID) {
  const container = $(containerID);
  // Clear the container before adding new notifications
  container.empty();
  // Loop through each notification in the data
  notifications.forEach((notification) => {
    // Generate notification HTML
    const notificationHTML = `
                <div class="notification-list">
                    <div class="notification-list_img">
                        <a href="javascript:void(0)" class="noti-id">
                            <img src="${getImagePath(
                              notification.profile_picture,
                              "default-boy.png"
                            )}" 
                                 alt="profile" class="img-fluid" loading="lazy">
                        </a>
                    </div>
                    <div class="notification-list_detail">
                        <p>
                            <a href="javascript:void(0)" class="noti-id">
                                <strong>${notification.member_name}</strong>
                            </a> ${notification.notification_text}
                        </p>
                        <p><small>${new Date(
                          notification.timestamp
                        ).toLocaleString()}</small></p>
                    </div>
                    <div class="notification-list_feature">
                        ${
                          notification.notification_type_id === 1
                            ? `${generateAcceptButtonNotificationList(
                                notification.notification_by
                              )}`
                            : `<a href="${
                                window.API_BASE_URL +
                                "/home/member-detail/" +
                                notification.notification_by
                              }">View Profile</a>`
                        }
                    </div>
                </div>
            `;
    // Append the generated HTML to the container
    container.append(notificationHTML);
    loadModelByMemberID(notification.notification_by);
  });
}
function loadProfileList5(notificationData, containerID) {
  const container = $(containerID);
  // Clear the container before adding new notifications
  container.empty();
  // Loop through each notification in the data
  notificationData.forEach((notification) => {
    // Set default values if any property is missing
    const profilePicture = notification.profile_picture || "default-boy.png";
    const profileUrl =
      window.API_BASE_URL +
      "/home/member-detail/" +
      notification.notification_by;
    const memberName = notification.member_name || "Unknown";
    const notificationMessage =
      notification.notification_text ||
      "has expressed interest in your profile";
    const timestamp = notification.timestamp || "20 Apr, 24 - 02:06 PM";
    // Generate notification item HTML
    const notificationHTML = `
            <div class="notification-list" data-notification-id="${
              notification.notification_id
            }" data-member-detail-url="${profileUrl}">
                <div class="notification-list_img">
                    <a href="${profileUrl}" class="noti-id">
                        <img src="${getImagePath(
                          profilePicture,
                          "default-boy.png"
                        )}" loading="lazy" alt="profile" class="img-fluid">
                    </a>
                </div>
                <div class="notification-list_detail">
                    <p>
                        <a href="${profileUrl}" class="noti-id">
                            <strong>${memberName}</strong>
                        </a> ${notificationMessage}
                    </p>
                    <p><small>${timestamp}</small></p>
                </div>
            </div>
        `;
    // Append the generated HTML to the container
    container.append(notificationHTML);
  });
}
function getLastSeenDataTime(lastOnline) {
  const now = new Date();
  const lastOnlineDate = new Date(lastOnline);
  const diffInSeconds = Math.floor((now - lastOnlineDate) / 1000);
  if (diffInSeconds < 300) {
    return "Online"; // Less than 5 seconds
  } else if (diffInSeconds < 600) {
    return `Last seen 5 minutes ago`; // Less than 1 minute
  } else if (diffInSeconds < 3600) {
    // Less than 1 hour
    const minutes = Math.floor(diffInSeconds / 60);
    return `Last seen ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    // Less than 1 day (86400 seconds in a day)
    const hours = Math.floor(diffInSeconds / 3600);
    return `Last seen ${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    // Less than 7 days (604800 seconds in a week)
    const days = Math.floor(diffInSeconds / 86400);
    return `Last seen ${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // 7 or more days
    return "Last seen 7+ days ago"; // 7+ days
  }
}
function updateTotalNumber(containerId, totalNumber) {
  // alert('this work');
  $(containerId + "_total_Count").text(totalNumber);
}
function getInnerHTMLByKey(key, profile) {
  // console.log(key);
  // console.log(profile);
  let innerHTML = "";
  switch (key) {
    case "shortlist":
      innerHTML = `
            <div class="col-md-3 intrest-sec grey-bg">
                <p class="pb-3 ">You Shortlisted this Profile, want to connect with them?</p>
                ${generateInboxShortlistButton(
                  profile.Shortlisted,
                  profile.member_id
                )}  
                </div> `;
      // ${generateShortlistButton(profile.Shortlisted , profile.member_id)}
      break;
    case "sendinterest":
      innerHTML = `
            <div class="col-md-3 intrest-sec grey-bg">
                  <p>You have Sent a Interested to this profile.</p>
                  <a href="" class="btn btn-outline-info"><i class="fad fa-circle-notch"></i> Pending </a>
                  ${loadReceivedInterestButton(
                    profile.member_id,
                    profile.interest_received_status,
                    profile.interest_sent_status,
                    true
                  )}
               </div>   `;
      break;
    case "accepted":
      message =
        "You accepted their interest. Now you can connect with this profile.";
      innerHTML = `
                    <div class="col-md-3 intrest-sec grey-bg">
                        <p>${message}</p>
                        ${loadReceivedInterestButton(
                          profile.member_id,
                          profile.interest_received_status,
                          profile.interest_sent_status,
                          true
                        )}
                    </div>
                `;
      break;
    case "rejected":
      message =
        "You rejected their interest. This profile cannot be connected with at the moment.";
      innerHTML = `
                    <div class="col-md-3 intrest-sec grey-bg">
                        <p>${message}</p>
                        ${loadReceivedInterestButton(
                          profile.member_id,
                          profile.interest_received_status,
                          profile.interest_sent_status,
                          true
                        )}
                    </div>
                `;
      break;
    case "received":
      message =
        "You received their interest. You can now respond to this profile.";
      innerHTML = `
                    <div class="col-md-3 intrest-sec grey-bg">
                        <p>${message}</p>
                        ${loadReceivedInterestButton(
                          profile.member_id,
                          profile.interest_received_status,
                          profile.interest_sent_status,
                          true
                        )}
                    </div>
                `;
      break;
    case "getAccepted":
      message =
        "They accepted your interest. You can now connect with this profile.";
      innerHTML = `
                    <div class="col-md-3 intrest-sec grey-bg">
                        <p>${message}</p>
                        ${loadReceivedInterestButton(
                          profile.member_id,
                          profile.interest_received_status,
                          profile.interest_sent_status,
                          true
                        )}
                    </div>
                `;
      break;
    case "getRejected":
      message =
        "They declined your invitation. This member cannot be contacted.";
      innerHTML = `
                    <div class="col-md-3 intrest-sec pink-bg rounded-0">
                        <p class="pink-text pt-5">${message}</p>
                    </div>
                `;
      break;
    case "ignore":
      // ${generateUnblockButton(profile.member_id)}
      innerHTML = `
            <div class="col-md-3 intrest-sec green-bg rounded-0">
                  <p class="pt-4">
                   You Ignored This Profile! <br>
                    Changed Your Mind ? 
                  </p>
                  ${generateInboxIgnoreButton(profile.member_id, 1)}
                  </div>
                    `;
      break;
    case "contactview":
      innerHTML = `
            <div class="col-md-3 intrest-sec grey-bg">
                  <p class="pt-4">
                    You View Contacts Number of this Profile.
                  </p>
                  ${generateConnectButton(profile.member_id)}
                  </div>
                    `;
      break;
    default:
      innerHTML = `<p class="pb-3">No action available for this profile.</p>`;
      break;
  }
  return innerHTML;
}
function getInnerHTMLByKeyForPageTitle(key) {
  let innerHTML = ""; // Variable to store HTML content
  // Define content based on the key
  switch (key) {
    case "shortlist":
      innerHTML = `
               <ul class="nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="#">Shortlisted Profiles
                                            <span id="member_inbox_profile_list_total_Count">0</span> </a>
                                    </li>
                                </ul>
            `;
      break;
    case "sendinterest":
      innerHTML = `
             <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link " href="${
                      window.API_BASE_URL + "/home/inbox/received"
                    }">Interest Received </a>
                  </li>
                   <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/sendinterest"
                    }">Interest Sent<span id="member_inbox_profile_list_total_Count">0</span></a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link " href="${
                    window.API_BASE_URL + "/home/inbox/accepted"
                  }">Accepted by Me</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="${
                    window.API_BASE_URL + "/home/inbox/getAccepted"
                  }">Accepted by ${
        window.MEMBER_GENDER === "bride" ? "Him" : "Her"
      } </a>
                  </li>
                </ul>
            `;
      break;
    case "received":
      innerHTML = `
                   <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/received"
                    }"> Interest Received <span id="member_inbox_profile_list_total_Count">0</span> </a>
                  </li>
                    <li class="nav-item">
                    <a class="nav-link" href="${
                      window.API_BASE_URL + "/home/inbox/sendinterest"
                    }">Interest Sent</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link " href="${
                      window.API_BASE_URL + "/home/inbox/accepted"
                    }">Accepted by Me </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="${
                      window.API_BASE_URL + "/home/inbox/getAccepted"
                    }">Accepted by ${
        window.MEMBER_GENDER === "bride" ? "Him" : "Her"
      }  </a>
                  </li>
                </ul>
                `;
      break;
    case "accepted":
      innerHTML = `
              <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link " href="${
                      window.API_BASE_URL + "/home/inbox/received"
                    }"> Interest Received </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="${
                      window.API_BASE_URL + "/home/inbox/sendinterest"
                    }">Interest Sent </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="${
                    window.API_BASE_URL + "/home/inbox/accepted"
                  }">Accepted by Me <span id="member_inbox_profile_list_total_Count">0</span> </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="${
                    window.API_BASE_URL + "/home/inbox/getAccepted"
                  }">Accepted by ${
        window.MEMBER_GENDER === "bride" ? "Him" : "Her"
      }  </a>
                  </li>
                </ul>
            `;
      break;
    case "getAccepted":
      innerHTML = `
                    <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link " href="${
                      window.API_BASE_URL + "/home/inbox/received"
                    }"> Interest Received  </a>
                  </li>
                    <li class="nav-item">
                   <a class="nav-link" href="${
                     window.API_BASE_URL + "/home/inbox/sendinterest"
                   }">Interest Sent </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link " href="${
                    window.API_BASE_URL + "/home/inbox/accepted"
                  }">Accepted by Me </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="${
                    window.API_BASE_URL + "/home/inbox/getAccepted"
                  }">Accepted by ${
        window.MEMBER_GENDER === "bride" ? "Him" : "Her"
      }  <span id="member_inbox_profile_list_total_Count">0</span></a>
                  </li>
                </ul>
                `;
      break;
    case "rejected":
      innerHTML = `
                <ul class="nav">
                   <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/rejected"
                    }">Cancelled by me <span id="member_inbox_profile_list_total_Count">0</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="${
                      window.API_BASE_URL + "/home/inbox/getRejected"
                    }">Cancelled by them </a>
                  </li>
                </ul>
            `;
      break;
    case "getRejected":
      innerHTML = `
                    <ul class="nav">
                      <li class="nav-item">
                        <a class="nav-link" href="${
                          window.API_BASE_URL + "/home/inbox/rejected"
                        }">Declined by me </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="${
                          window.API_BASE_URL + "/home/inbox/getRejected"
                        }">Declined by them <span id="member_inbox_profile_list_total_Count">0</span> </a>
                      </li>
                    </ul>
                `;
      break;
    case "ignore":
      innerHTML = `
               <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/ignore"
                    }">All Ignored Profils <span id="member_inbox_profile_list_total_Count">0</span> </a>
                  </li>
                </ul>
            `;
      //     <li class="nav-item">
      //     <a class="nav-link" href="${window.API_BASE_URL+'/home/inbox/sendinterest'}">Unblock Profils </a>
      //   </li>
      break;
    case "otherviewMe":
      innerHTML = `
                   <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/otherviewMe"
                    }">Profile Visitors <span id="member_inbox_profile_list_total_Count">0</span> </a>
                  </li>
                   <li class="nav-item">
                    <a class="nav-link " aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/meviewother"
                    }">Profiles Visited By Me </a>
                  </li>
                </ul>
                `;
      break;
    case "meviewother":
      innerHTML = `
                <ul class="nav">
                  <li class="nav-item">
                  <a class="nav-link " aria-current="page" href="${
                    window.API_BASE_URL + "/home/inbox/otherviewMe"
                  }">Profile Visitors </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="${
                    window.API_BASE_URL + "/home/inbox/meviewother"
                  }">Profiles Visited By Me <span id="member_inbox_profile_list_total_Count">0</span> </a>
                  </li>
                </ul>
                `;
      break;
    case "contactview":
      innerHTML = `
                       <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/contactview"
                    }">Contact Viewed by you <span id="member_inbox_profile_list_total_Count">0</span> </a>
                  </li>
                </ul>
                    `;
      break;
    case "allreceived":
      innerHTML = `
                               <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/received"
                    }">Interest Recived <span id="member_inbox_profile_list_total_Count">0</span> </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="${
                      window.API_BASE_URL + "/home/inbox/sendinterest"
                    }">Interest Sent </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link " href="${
                      window.API_BASE_URL + "/home/inbox/accepted"
                    }">You Accepted </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="${
                      window.API_BASE_URL + "/home/inbox/getAccepted"
                    }">They Accepted </a>
                  </li>
                </ul>
                        `;
      break;
    case "allsended":
      innerHTML = `
                       <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link " href="${
                      window.API_BASE_URL + "/home/inbox/received"
                    }">Interest Recived </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${
                      window.API_BASE_URL + "/home/inbox/sendinterest"
                    }">Interest Sent <span id="member_inbox_profile_list_total_Count">0</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link " href="${
                      window.API_BASE_URL + "/home/inbox/accepted"
                    }">You Accepted </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="${
                      window.API_BASE_URL + "/home/inbox/getAccepted"
                    }">They Accepted </a>
                  </li>
                </ul>
                            `;
      break;
    default:
      innerHTML = `<p class="pb-3">No action available for this profile.</p>`;
      break;
  }
  return innerHTML;
}
function setProfileContent(key) {
  // Select the element with jQuery
  const profileContainer = $("#profileTitleContainer");
  // Set the HTML content using jQuery's .html() method
  profileContainer.html(getInnerHTMLByKeyForPageTitle(key));
}
function generatePagination(
  paginator,
  type,
  containerId,
  ListKey,
  formID,
  PaginatorContainerId
) {
  const currentPage = paginator.current_page;
  const lastPage = paginator.last_page;
  const links = paginator.links;
  let paginationHtml = '<div class="pagination"><ul class="pagination">';
  // submitSearchFilterForm(url, type, containerID, ListKey, formID)
  if (paginator.prev_page_url) {
    paginationHtml += `
                <li class="page-item">
                    <a class="page-link" onclick="submitSearchFilterForm('${paginator.prev_page_url}', '${type}', '${containerId}', '${ListKey}', '${formID}')" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="visually-hidden">Previous</span>
                    </a>
                </li>`;
  } else {
    paginationHtml += `
                <li class="page-item disabled">
                    <span class="page-link">&laquo;</span>
                </li>`;
  }
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(lastPage, currentPage + 2);
  if (start > 1) {
    paginationHtml += `
                <li class="page-item">
                    <a class="page-link" onclick="submitSearchFilterForm('${paginator.first_page_url}', '${type}', '${containerId}', '${ListKey}', '${formID}')">1</a>
                </li>`;
    if (start > 2) {
      paginationHtml += `
                    <li class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>`;
    }
  }
  for (let i = start; i <= end; i++) {
    const link = links.find((l) => l.label === i.toString());
    if (link) {
      paginationHtml += `
                    <li class="page-item ${link.active ? "active" : ""}">
                        <a class="page-link ${
                          link.active ? "active" : ""
                        }" onclick="submitSearchFilterForm('${
        link.url
      }', '${type}', '${containerId}', '${ListKey}', '${formID}')">${i}</a>
                    </li>`;
    }
  }
  if (end < lastPage) {
    if (end < lastPage - 1) {
      paginationHtml += `
                    <li class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>`;
    }
    paginationHtml += `
                <li class="page-item">
                    <a class="page-link" onclick="submitSearchFilterForm('${paginator.last_page_url}', '${type}', '${containerId}', '${ListKey}', '${formID}')">${lastPage}</a>
                </li>`;
  }
  if (paginator.next_page_url) {
    paginationHtml += `
                <li class="page-item">
                    <a class="page-link" onclick="submitSearchFilterForm('${paginator.next_page_url}', '${type}', '${containerId}', '${ListKey}', '${formID}')" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="visually-hidden">Next</span>
                    </a>
                </li>`;
  } else {
    paginationHtml += `
                <li class="page-item disabled">
                    <span class="page-link">&raquo;</span>
                </li>`;
  }
  paginationHtml += "</ul></div>";
  // // console.log(paginationHtml);
  const container = document.getElementById(PaginatorContainerId);
  if (container) {
    container.innerHTML = paginationHtml;
  } else {
    // console.error(`Container with ID '${PaginatorContainerId}' not found.`);
  }
}
function shortenString(str, maxLength = 10) {
  if (str.length > maxLength) {
    // Return the first part of the string and append '...' at the end
    return str.substring(0, maxLength) + "...";
  }
  // Return the original string if it's not longer than maxLength
  return str;
}
function redirectToMemberDetailsPage(memberData) {
  // Extract the member_id from the memberData
  const memberId = memberData.member_id;
  // Construct the URL for redirection
  const memberDetailsUrl =
    window.API_BASE_URL + `/home/member-detail/${memberId}`;
  // Log the redirection URL (optional)
  // console.log('Redirecting to:', memberDetailsUrl);
  // Redirect to the member details page
  window.location.href = memberDetailsUrl;
}
function scrollToElementById(elementId) {
  const $element = $(elementId);
  if ($element.length) {
    $("html, body").animate(
      {
        scrollTop: $element.offset().top,
      },
      500
    ); // 500ms for smooth scrolling
  } else {
    console.warn(`Element with ID "${elementId}" not found.`);
  }
}

function scrollToElement(containerID) {
  const element = document.getElementById(containerID);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.warn(`Element with ID "${containerID}" not found.`);
  }
}
