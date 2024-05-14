// Nomenclatura de variáveis

const followersByCategoryList = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getGithubUserCategoryByNumberOfFollwers(request, res) {
  const githubUsername = String(request.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const githubUserResponse = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (githubUserResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUser = await githubUserResponse.json()

  const followersByCategoryDescendingList = followersByCategoryList.sort((a, b) => b.followers - a.followers);

  const userCategory = followersByCategoryDescendingList.find(category => githubUser.followers > category.followers)

  const result = {
    githubUsername,
    userCategory: userCategory.title
  }

  return result
}

getGithubUserCategoryByNumberOfFollwers({
  query: {
    username: 'Aristiklever-R-Sousa'
  }
}, {}).then((data) => console.log(data))
