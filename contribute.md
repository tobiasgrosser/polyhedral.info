---
layout: default
title: Contribute
---

Who?
====

Everybody is invited to contribute.

How?
====

### By email

Just send an email to [polyhedral@grosser.es](mailto:polyhedral@grosser.es) and the
content will be integrated.

### Directly change the repository

#### 1. Clone the website

	git clone https://github.com/tobig/polyhedral.info.git

#### 2. Perform your changes


#### 3. Submit changes

Use `git format-patch origin/HEAD` to obtain patch files containing your changes and
submit those patches to [polyhedral@grosser.es](mailto:polyhedral@grosser.es).


How to add/change content
=================================

#### Add a new page

To add a new page, copy the file `index.md` to `newpage.md` and change the
`title` tag at the top of the file. You can now reference this page by
adding links to `newpage.html`.

#### Change a page

To change the content of `software.html`, open the file `software.md` in your
favorite text editor and modify the content as you like. Pages  are stored in
individual text files, which can be edited with your normal text editor and
which are formatted using [Markdown](http://kramdown.gettalong.org/quickref.html).

#### Add a new publication

Publications are added by modifying the `Publications.bib` file. The publications
page is automatically derived from this tex file. To cite a publication that is part
of the `Publications.bib` file, just add `<a class="citation">QUILLERE2000</a>`
to any page. This will create the following citation <a class="citation">QUILLERE2000</a>.

#### Write a blog entry

Blog entries are normal pages stored in the folder `_posts` and using the
naming convention `yyyy-mm-dd-page-title.md`. They automatically show up in the
newest post list.


#### Formulars
You can also use [MathJax](http://www.mathjax.org) to include latex formulars in your code. The following example shows the code you would create as well as
its rendered version:

	When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are
	$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

### Test changes

To test changes you propose for inclusion, it may be useful to run this
website at home. 

#### Install jekyll

On Linux (debian/Ubuntu) this can be done by running `apt-get install jekyll`. For other systems see the detailed [install instructions](https://help.github.com/articles/using-jekyll-with-pages)

#### Run the website locally

       $jekyll --server --auto

#### View the website

Open [http://0.0.0.0:4000](http://0.0.0.0:4000) with your web browser.

### History of the website

The history of this website including the individual contributors
and their contributions is available in <a
href="https://github.com/tobig/polyhedral.info/commits/gh-pages"> the
git repository</a>.
