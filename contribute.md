---
layout: default
title: Contribute
---

Who can contribute?
===================


Everybody is invited to contribute content to
[http://polyhedral.info](polyhedral.info). This includes researchers how want
to share their work as well as users who found interesting information they
would like to share.

How to contribute?
==================

Contribute contend in three easy steps.

### 1. Clone the website

	git clone https://github.com/tobig/polyhedral.info.git

### 2. Perform your changes

The content of this website is managed as a
[Jekyll](https://github.com/mojombo/jekyll) static website. It is
modified by editing the text files in the git repository. The files
in the repository use [Markdown syntax] (http://daringfireball.net/projects/markdown/syntax).
You can also use [MathJax](http://www.mathjax.org) to include latex formulars in your code.
This code is e.g. rendered as follows:

	When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are
	$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

#### Change a page

To change the content of software.html, open the file 'software.md' in your
favorite text editor and modify the content as you like.

#### Add a new page

To add a new page, copy the file 'index.md' to 'newpage.md' and change the
'title' tag at the top of the file. You can now reference this page by
adding links to 'newpage.html'.

#### Add a new publication

Publications are added by modifying the 'Publications.bib' file. The publications
page is automatically derived from this tex file. To cite a publication that is part
of the 'Publications.bib' file, just add `<a class="citation">QUILLERE00</a>`
to any page. This will create the following citation <a class="citation">QUILLERE00</a>.


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

You can use the [github](http://github.com) web interface to fork the polyhedral.info
[git-repository] (http://github.com/tobig/polyhedral.info). You can work on
your fork, push your changes to your github fork and use github merge requests
to submit your changes to the main repository.
