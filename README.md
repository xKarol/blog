<center>
<br/>
<h1>Blog</h1>
<br/>
</center>
<h2 style="display: inline-block">Table of Contents</h2>
<ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#links">Links</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#screens">Screens</a></li>
</ol>

## About the Project
This project was created without any frameworks. The project uses Firebase to store data.

Working features:
- Sign In/Sign Up
- Increment post views
- Fetching posts
- Writing comments
- Fetching comments
- Infinite scroll
- Dropdown menu
- Logout option
- Skeleton loading
- Posts empty state
- Sign Up/Sign In error handling

Pages:
- Home
- Sign In
- Sign Up
- Post page
- Post creator

## Built With
* Javascript
* OOP
* <a href="https://webpack.js.org/">Webpack</a>
* <a href="https://firebase.google.com/">Firebase</a>
* <a href="https://momentjs.com/">Moment</a>
* <a href="https://sass-lang.com/">SASS</a>

## Links 
- Project URL: [https://blog-page-js.netlify.app/](https://blog-page-js.netlify.app/)

## Installation
1. Make sure you have installed Node. You can download it from [here](https://nodejs.org/en/).
2. Open console ([Help](#usage))
3. Change directory

`cd desktop`

4. Clone the repo

`git clone https://github.com/xKarol/blog.git`

5. Change directory

`cd blog`

6. Install NPM packages

`npm install`

7. Create environment variables file

`type nul > .env`

1. Open project in code editor

`code .`

1. Open **.env** file
2.  Paste this into .env file

```
FIREBASE_API=YOUR_KEY_HERE
FIREBASE_AUTH_DOMAIN=YOUR_KEY_HERE
FIREBASE_PROJECT_ID=YOUR_KEY_HERE
FIREBASE_STORAGE_BUCKET=YOUR_KEY_HERE
FIREBASE_MESSAGING_SENDER_ID=YOUR_KEY_HERE
FIREBASE_APP_ID=YOUR_KEY_HERE
```

11.   Create new firebase project [here](https://console.firebase.google.com/)
12.   Select web app and get your keys from firebase config
13.   Paste your keys into .env file
14.   Open [unsplash.com/developers](https://unsplash.com/developers)
15.   Get API key
16.   Paste your unsplash api key into .env file 
```
UNSPLASH_CLIENT_ID=YOUR_ID
```

## Usage
1. Open console

```
1. Press Win + R
2. Type "cmd"
```
2. Change directory

```cd desktop/blog```

3. Run project

```npm run dev```


## Screens
<details>
  <summary><h4 style="display: inline-block">Desktop</h2></summary>


![FireShot Capture 064 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998126-5e0d2cbc-3a69-481d-b552-2d26016a4cff.png)

![FireShot Capture 065 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998147-47b95a7b-971d-47fd-8e3e-9e82cf0da77d.png)

![FireShot Capture 066 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998160-8e2faf25-0ea3-4547-ae81-52515abca79e.png)

![FireShot Capture 055 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998243-54485239-e6e6-4546-a9a8-df7da89a580e.png)

![FireShot Capture 058 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998196-b37e581f-1668-4354-a1c6-f063b5dfbc13.png)

![FireShot Capture 063 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998285-bd3ce21a-65ec-4331-85b4-415202d0c222.png)

![FireShot Capture 066 - Blog - Editor - blog-page-js netlify app](https://user-images.githubusercontent.com/83913433/170252868-1eb4ca28-5f95-4c53-9a87-604f30d96284.png)

</details>

<details>
  <summary><h4 style="display: inline-block">Mobile</h2></summary>

![FireShot Capture 067 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998172-8da4d1e7-339a-4863-94ed-4c278faf451f.png)

![FireShot Capture 068 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998184-694ae06d-3709-40ec-9c35-419dd1626c9a.png)

![FireShot Capture 069 - Blog - localhost](https://user-images.githubusercontent.com/83913433/168998188-7e699861-ef23-4770-aae5-8bf537be1192.png)


</details>