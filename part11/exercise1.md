# Exercise 11.1 - Warming up

### Description

Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named exercise1.md in the root of the repository that you shall create in exercise 11.2.

### Answer

Supposing that the language used for the application is Python (e.g. Django, Flask), some tools for a CI setup I have found online are:

- Linting: Pylint or Ruff
- Testing: Pytest and tox or unittest
- Building: n/a

I am not very knowledgeable with how workflows generally go when it comes to web applications in Python but I imagine it would have many similarities with the usual JavaScript/TypeScript project. There appears to be some [documentation](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python) by Github themselves that showed a simple CI workflow that could be helpful for the initial setup.

Some alternatives for Jenkins and Github Actions are:

- Gitlab CI
- CircleCI

From what I have found in my searching, it appears that Gitlab CI is praised well. CircleCI meanwhile is a name I have seen before, if I remember correctly it was used for the website of The Odin Project as I saw it in their CI workflow.

This setup would be better in a cloud-based environment because of the relatively small-scale of the team. I think that a self-hosted setup might become more ideal once the scale of the development team and their work becomes larger.

Sources:

- https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python
- https://docs.djangoproject.com/en/4.2/topics/testing/
