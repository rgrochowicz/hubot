# Deploying Brobbot to UNIX

Because there are so many variations of Linux, and more generally UNIX, it's
difficult for the brobbot team to have canonical documentation for installing and
deploying it to every version out there. So, this is an attempt to give an
overview of what's needed to get deploying.

There are 3 primary things to deploying and running brobbot:

  * node and npm
  * a way to get source code updated on the server
  * a way to start brobbot, start it up if it crashes, and restart it when code
    updates

## node and npm

To start, your UNIX server will need node and npm. Check out the node.js wiki
for [installing Node.js via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager), [Building on GNU/Linux and other UNIX](https://github.com/joyent/node/wiki/Installation#building-on-gnulinux-and-other-unix).

## Updating code on the server

The simplest way to update your brobbot's code is going to be to have a git
checkout of your brobbot's source code (that you've created during [Getting Started](../README.md), not the [github/brobbot repository](http://github.com/github/brobbot), and just git pull to get change. This may
feel a dirty hack, but it works when you are starting out.

If you have a Ruby background, you might be more comfortable using
[capistrano](https://github.com/capistrano/capistrano).

If you have a [Chef](http://www.opscode.com/chef/) background, there's a
[deploy](http://docs.opscode.com/resource_deploy.html) resource for managing
deployments.

## Starting, stopping, and restarting brobbot

Every brobbot-instance install has a `./index.sh` script to handle starting up the brobbot.
You can run this command from your git checkout on the server, but there are some problems you can encounter:

* you disconnect, and brobbot dies
* brobbot dies, for any reason, and doesn't start again
* it doesn't start up at boot automatically

For handling you disconnecting, you can start with running `./index.sh` in
[screen session](http://www.gnu.org/software/screen/) or with
[nohup](http://linux.die.net/man/1/nohup).

For handling brobbot dying, and restarting it automatically, you can imagine
running `./index.sh` in a
[bash while loop](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-7.html#ss7.3). But
really, you probably want some process monitoring using tools like
[monit](http://mmonit.com/monit/),
[god](http://godrb.com/),
[bluepill](https://github.com/arya/bluepill),
[upstart](http://upstart.ubuntu.com/).

For starting at boot, you can create an init script for appropriate your UNIX
distribution, or if you are using one the process monitoring tools above, make
sure it boots at startup.

## Recommendations

This document has been deliberately light on strong recommendations. At a high
level though, it's strongly recommended to avoid anything that is overly manual
and non-repeatable. That would mean using your OS's packages and tools whenever
possible, and having a proper deploy tool to update brobbot, and process
management to keep brobbot running.
