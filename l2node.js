    "use strict"
var colors = require("colors"),
    features = ["User", "Request", "Response", "Cache", "Preference", "Token", "Profile", "Application", "Security"],
    patterns = ["Factory", "Observer", "Manager", "Repository", "Impl", "Dao", "Service", "Delegate", "Activity"],
    requirements = ["return HTTP 403 to unauthorized users",
                    "accept UTF-8 input",
                    "return HTTP 400 for invalid input",
                    "correctly escape SQL",
                    "validate redirects",
                    "provide online documentation",
                    "select internationalized strings, based on locale",
                    "support localized date formats",
                    "work in IE6",
                    "pass W3C validation",
                    "produce valid JSON",
                    "work with screen readers",
                    "use HTML5 canvas where available",
                    "blink"],
    minTimeout = 100,
    maxTimeout = 1000,
    minRequirements = 2,
    maxRequirements = 6,
    skipThreshold = 0.1,
    failThreshold = 0.2


function randBetween(l, u) {
  return Math.floor(Math.random() * (u - l) + l) 
}

function choose(l) {
  return l[randBetween(0, l.length)]
}

function timeout() {
  return randBetween(minTimeout, maxTimeout)
}

function printFeature() {
  console.log("")
  var feature = choose(features) + choose(patterns)
  var article = /^[AEIOU]/.test(feature) ? "An " : "A "
  console.log(article + feature + " should")
  setTimeout(function() {
    var reqs = randBetween(minRequirements, maxRequirements)
    printRequirements(reqs)
  }, timeout())
}

function printRequirements(i) {
  if (i > 0) {
    var skipFailOrPass = Math.random()
    if (skipFailOrPass < skipThreshold) {
      console.log(("- " + choose(requirements) + " (SKIPPED)").cyan)
    } else if (skipFailOrPass < failThreshold) {
      console.log(("x " + choose(requirements) + " (FAILED)").red)
      console.log(("  - Given I am on the " + choose(features) + " page").green)
      console.log(("  - When I click on the " + choose(features) + " link").green)
      console.log(("  x Then the Log Out link should be visible in the top right hand corner").red)
    } else {
      console.log(("+ " + choose(requirements)).green)
    }
    setTimeout(function() {printRequirements(i - 1)}, timeout())
  } else {
    printFeature()
  }
}

printFeature()