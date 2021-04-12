let contacts = []

function addContact(event) {
  event.preventDefault()

  let form = event.target
  let contactName = form.contactName.value
  let contactPhone = form.phone.value
  let emergencyContact = document.getElementById("checkbox")

  emergencyContact = emergencyContact.checked
  
  contactInfo = {contactName, contactPhone, emergencyContact}

  contacts.push(contactInfo)
  saveContacts()
  
  form.reset()
}

function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))
  if(contactsData){
    contacts = contactsData
}
}

function drawContacts() {
  let template = ""
  
    contacts.forEach(contact => {
      
      if(contact.emergencyContact == false){
        template += 
      `
      <div class="card mt-1 mb-1">
      <h3 class="mt-1 mb-1">
      ${contact.contactName}
      </h3>
      <div class="d-flex space-between">
        <p>
          <i class="fa fa-fw fa-phone"></i>
          <span>
          ${contact.contactPhone}
          </span>
        </p>
        <i class="action fa fa-trash text-danger" onclick="removeContact(${contacts.indexOf(contact)})"></i>
      </div>
    </div>
    `}
    else{
      template += 
    `
    <div class="card mt-1 mb-1 emergency-contact">
      <h3 class="mt-1 mb-1">${contact.contactName}
      </h3>
      <div class="d-flex space-between">
        <p>
          <i class="fa fa-fw fa-phone"></i>
          <span>
          ${contact.contactPhone}
          </span>
        </p>
        <i class="action fa fa-trash text-danger" onclick="removeContact(${contacts.indexOf(contact)})"> </i>
      </div>
    </div>`
    }
    })
    document.getElementById("contact-list").innerHTML = template
}

function removeContact(contactId) {
let remove = contacts.splice(contactId,1)

saveContacts()
}

function showContactForm(){
  document.getElementById("new-contact-form").classList.remove("hidden")
}

function hideContactForm(){
  document.getElementById("new-contact-form").classList.add("hidden")
}

loadContacts()
drawContacts()