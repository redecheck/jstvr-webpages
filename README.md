![](https://github.com/redecheck/jstvr-webpages/workflows/GitHub%20Actions/badge.svg)

# Replication Web Pages for a JSTVR Paper

This repository contains the subject web pages used in the experimental study
of the following research paper:

"Automatically Identifying Potential Regressions in the Layout of Responsive
Web Pages" <br> Thomas A. Walsh, Gregory M. Kapfhammer, and Phil McMinn <br>
<em>Software Testing, Verification and Reliability</em>, 2020

This repository contains the complete source code of the following web sites:

- `aftrnoon.com`
- `annettescreations.net`
- `ashtonsnook.com`
- `bittorrent.com`
- `coursera.com`
- `denondj.com`
- `getbootstrap.com`
- `issta.cispa`
- `namemesh.com`
- `paydemand.com`
- `rebeccamade.com`
- `reserve.com`
- `responsiveprocess.com`
- `shield.com`
- `teamtreehouse.com`

Please note that the authors of the aforementioned research paper are not
affiliated with the creators of the above web sites. Moreover, given the rapidly
evolving nature of web content, the version of the web site archived in this
repository is unlikely to reflect the current version of the site, which also
may no longer be publicly available.

## Overview of the Subjects

As seen above, the 15 web sites used as subjects in the paper were: "Aftrnoon",
a web site for a design studio; "Annette’s Creations", an online shop; "Ashton
Snook", the homepage of a visual designer; "Bootstrap", the homepage for the
popular web design framework; "Coursera", the well-known provider of massive
open online courses; "Denon", a manufacturer of high-end headphones and DJ
equipment; "ISSTA 2016", the web site for a software testing conference; "Name
Mesh", a site that suggests suitable web domains; "Pay Demand", a web site for
businesses to compare rates for credit card processing; "Rebecca Made", a web
developer’s showcase; "Reserve", the web site of a mobile application that
performs restaurant reservations; "Responsive Process", an educational web site
about responsive web design; "Shield", the site of a responsive template and
finally, "Treehouse", a platform for technology training. Importantly, these web
sites come from a wide variety of application domains, thus ensuring the
representativeness of this paper’s empirical results.

## Structure of a Subject's Directory

If you inspect the directory for one of the subjects, like `coursera.com/`, you
will find an `index/` directory and then directories for each of the mutants of
this subject, like `mutant1/`. Inside of the `index/` directory you will find
the `index.html` file that is the main page of the subject used in the paper's
experiments and a `resources/` directory that contains all of the resources for
the subject, including its JavaScript, CSS, and image files. If you look inside
of a specific mutant directory, like `mutant1/`, you will find the automatically
modified HTML or CSS files for that specific mutant. Finally, if the name of the
mutant is `mutant1`, then in that mutant's respective directory you will find a
`mutant1.txt` file that describes the changes made to produce the mutant.

## Problems or Praise

If you have any problems with installing or using any of the subjects provided
for these the purpose of replicating the experimental study in the paper, then
please create an issue associated with this repository using the "Issues" link
at the top of this page. The authors of the JSTVR paper will do all that they
can to resolve your issue and ensure that you can use these subjects in your
own experiments.
