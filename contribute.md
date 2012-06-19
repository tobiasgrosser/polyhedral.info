---
layout: default
title: Contribute
---

Who can contribute?
===================

Everybody is invited to contribute content to
[http://polyhedral.info](polyhedral.info). We invite both researchers to
contribute their own work as well as users who found some interesting work they
would like to share. The content of this website is currently not peer-reviewed
before being published. Changes are pushed as soon as they are free from
obvious content and style issues. However, changes to this website are openly available
through the git change log. We invite everybody to review these changes.

We may introduce a more formal review process later on, but would like to avoid unnecessary
overhead.

How to contribute?
==================

To contribute your own content to polyhedral.info the following steps are necessary:

### 1. Clone the content to your computer

To obtain the content of this website, use [git](git-scm.com) to clone the
repository of this website to your own computer.

	git clone https://github.com/tobig/polyhedral.info.git

### 2. Perform your changes

The content of this website is managed as a
[Jekyll](https://github.com/mojombo/jekyll) static website. It is
modified by editing the text files in the git repository. The files
in the repository use [Markdown syntax] (http://daringfireball.net/projects/markdown/syntax).

#### Change a page

To change the content of software.html, open the file 'software.md' in your
favorite text editor and modify the content as you like.

#### Add a new page

To add a new page, copy the file 'index.md' to 'newpage.md' and change the
'title' tag at the top of the file. You can now reference this page by
adding links to 'newpage.html'.

#### Add a new publication

Publications are added by modifying the 'Publications.tex' file. The publications
page is automatically derived from this tex file.

#### Write a blog entry

Blog entries are normal pages stored in the folder '_posts' and using the
naming convention 'yyyy-mm-dd-page-title.md'. They automatically show up in the
newest post list.

### 3. Submit the changes upstream

To contribute your changes upstream, there are two options:

#### a) Submit patches via email

Use 'git format-patch' to obtain patch files containing your change sets. Email
those to tobias at grosser dot es to submit them to be published on polyhedral.info.

#### b) github pull requests

You can use the [github](github.com) web interface to fork the polyhedral.info
[git-repository] (https://github.com/tobig/polyhedral.info). You can work on
your fork, push your changes to your github fork and use github merge requests
to submit your changes to the main repository.
