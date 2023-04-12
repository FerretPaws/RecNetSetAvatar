// Check if in RecNet
if (!window.location.href.includes("rec.net")) {
    alert("Not in RecNet! https://rec.net")
    throw new Error("Not in RecNet!")
}
 
// Check auth local storage
auth_storage = JSON.parse(localStorage.getItem("oidc.user:https://auth.rec.net:recnet"))
if (!auth_storage) {
    alert("Not logged in!")
    throw new Error("Haven't logged in!")
}
 
// Acquire access token required for changing your pfp
acc_token = "Bearer " + auth_storage['access_token']
 
// Ask for image link
img = prompt("Please enter the img.rec.net link!")
 
// Check if they input something
if (img == "" || img == null) {
    alert("You didn't input a link!")
    throw new Error("Didn't input a link!")
} else if (!img.includes("img.rec.net")) {  // If not img.rec.net link
    alert("Only accepts img.rec.net links!")
    throw new Error("Didn't input a valid link!")
}
 
// Get the image name from url
img_name = img.split("/").at(-1).split("?").at(0)
 
// Change profile picture
r = await fetch("https://accounts.rec.net/account/me/profileimage", {
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Authorization": acc_token
    },
    "body": "imageName=" + img_name,
    "method": "PUT"
})
 
// Check results
is_json = r.headers.get('content-type').includes("application/json")
if (!is_json) {
    alert("You didn't input a valid link!")
    throw new Error("Didn't input a valid link!")
}
 
r_json = await r.json()
alert("Success: " + r_json.success + "\nError: " + r_json.error)
