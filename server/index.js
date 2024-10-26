//event listerners

document.querySelector("#newProperty").addEventListener("submit", handleNewProperty)


// render functions
function handleNewProperty (e) {
    e.preventDefault()
    let newProperty = {
          name: e.target.name.value,
          location: e.target.location.value,
          image: e.target.image.value,
          availability: e.target.date.value,
          price: e.target.price.value,
          description: e.target.description.value,
          contactPerson: e.target.contactPerson.value,
          contactNumber: e.target.contactNumber.value,
          userComments: ""
    }
    renderProperty(newProperty)
    listnewProperty(newProperty)
}

// function propertiesListed (property) {
//     const li = document.createElement("li")
//     li.innerText = property.name.toUpperCase()
//     document.querySelector("#properties").appendChild(li)
//     renderProperty(property)
    
// }

function createRecommendationObj (property){
    //console.log(property)
     commentsObject = {
        id: property.id,
        name: property.name,
        comment1: "",
        comment2: "",
        comment3: ""
    }
    //console.log(commentsObject)
    // fetch ("http://localhost:3000/recommendations", {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(commentsObject)
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
}

function renderProperty (property){
    const card = document.createElement("li")
    card.classList = "card column d-flex flex-column"
    const image = document.createElement("img")
    card.appendChild(image)
    image.src = property.image
    document.querySelector("#propertiesCard").appendChild(card)
    const div1 = document.createElement('div')
    card.appendChild(div1)
    const heading = document.createElement('p')
    heading.textContent = `${property.name} is a ${property.description} located at ${property.location}`
    div1.appendChild(heading)
    const para1 = document.createElement('p')
    const para2 = document.createElement('p')
    const para3 = document.createElement('p')
    const h5 = document.createElement("h5")
    const para4 = document.createElement('p')
    para1.textContent = `Price per day: Ksh. ${property.price}`
    para2.textContent = `Availability: ${property.availability}`
    para3.textContent = `Call ${property.contactPerson} on ${property.contactNumber}`
    h5.textContent = "User Comment"
    para4.textContent = property.userComments
    div1.appendChild(para1)
    div1.appendChild(para2)
    div1.appendChild(para3)
    div1.appendChild(h5)
    div1.appendChild(para4)
    const form = document.createElement('form')
    form.id = "newComment"
    const textarea = document.createElement('textarea')
    textarea.classList= "form-control"
    textarea.id = "textArea1"
    textarea.placeholder = "What I liked(disliked) most ..."
    const button = document.createElement('button')
    button.type = "submit"
    button.classList = "btn btn-primary col"
    button.textContent = "New comment"
    button.id = 'view'
    const div2 = document.createElement('div')
    card.appendChild(div2)
    div2.appendChild(form)
    form.appendChild(textarea)
    form.appendChild(button)
    const div3 = document.createElement('div')
    card.appendChild(div3)
    const deleteButton = document.createElement('button')
    deleteButton.id = "deleteProperty"
    deleteButton.classList = "btn btn-danger align-self-end"
    deleteButton.textContent = 'Delist property'
    div3.appendChild(deleteButton)

    //create commentsObject
    card.querySelector('#newComment').addEventListener('submit', (e)=> { 
        e.preventDefault()
        if (e.target.textArea1.value.trim() === '') {
            alert('Please fill in your comment!');
          } else {
        property.userComments = e.target.textArea1.value
        para4.textContent = property.userComments
        updateComment(property)}
        form.reset()
        
        })
    card.querySelector("#deleteProperty").addEventListener('click', ()=>{
        card.remove()
        deleteProperty(property.id)
    })
        
}




// function displayCommentsCard(){
//     let image = document.querySelector("#viewed")
//     console.log(image)
// }

// displayCommentsCard()

// my fetches
function getPropertiesListed () {
    fetch ("http://localhost:3000/properties")
    .then(res => res.json())
    .then(propertiesData => propertiesData.forEach(property => renderProperty(property)))
}
getPropertiesListed()

function listnewProperty (newProperty) {
    fetch ("http://localhost:3000/properties", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProperty)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function createCommentAPI(commentsObject) {
    fetch ("http://localhost:3000/recommendations", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentsObject)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function updateComment (propertyObj){
    fetch(`http://localhost:3000/properties/${propertyObj.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(propertyObj)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function deleteProperty (id){
    fetch(`http://localhost:3000/properties/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
        
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
//createCommentAPI(commentsObject)