
# Profilter

Profilter is a robust and user-friendly Express API designed to detect and filter out offensive language from any given string. Built with efficiency and reliability in mind, Profilter offers a quick and easy solution for maintaining clean and respectful communication within your applications. Whether you're developing a chat app, forum, or any platform where user-generated content is involved, Profilter ensures your community standards are upheld seamlessly.

## Why did I make this?
I wanted a simple and efficient way to filter out offensive language from user-generated content in my applications. I found that existing solutions were either too complex, slow, or unreliable. So, I decided to build Profilter to address these issues and provide a fast and efficient solution for offensive language detection and filtering. This isnt going to be the best solution for everyone, but it is a good starting point for those who want to build their own. Plus it just sounded like a fun project to tinker with.

## Features

- Offensive language detection and filtering
- Customizable word blacklist
- Fast and efficient processing

## Example Usages

Here are a few examples of how you can use Profilter in your applications:

- Filter out offensive language from user-generated content:
  ```js
    const response = await fetch('https://<yourdomain:port>/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
  ```
  Example Response: 
  ```json
  {
    "containsProfanity": true,
    "unfilteredString": "this message contains curse words it will be flagged shit",
    "filteredString": "this message contains curse words it will be flagged ****",
    "triggeredWords": [
      "shit"
    ]
  }
  ```

- To customize the word blacklist, simply add or remove words from the `profanityList.csv` file.

## Installation

You can either create a simple docker container or run the application locally using node. ( I would recommend using docker )
Remember to update the port and host for the application in the `index.js` file. (Default is 3000)
