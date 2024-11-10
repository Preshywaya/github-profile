const APIURL = 'https://api.github.com/users/'



const main = document.getElementById('main')
const form = document.getElementById('form')
const search= document.getElementById('search')



async function geUser(username) {
    try {
        const { data }= await axios(APIURL + username)


        createUserCard(data)
        
    } catch(err) {

        if(err.response.status == 404) {


            createErrorCard('NO  PROFILE WITH THIs USERNAME')

        }
    
    }
    

    

    
}

function createUserCard(user) {
    const cardHTML = `

     <div class="card">
            <div>
                <img src="${user.avater_url}" alt="${user.name}">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers} <strong>followers</strong></li>
                    <li>${user.following} <strong>following</strong></li>
                    <li>${user.public_repos} <strong>repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
          `

    main.innerHTML = cardHTML

}

function createErrorCard(msg) {
    const cardHTML = `

    <div class="card">
        <h1>${msg}</h1>
    </div>
    `

    main.innerHTML = cardHTML
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value
    if(user) {
        geUser(user)

        search.value = ''
    }
})
