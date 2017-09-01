---
layout: post
Description: Short post about tools for testing Galaxy Instances
Tags:
- galaxy
- testing
- dev
- work
date: 2017-01-07T07:01:33Z
title: Galaxy Instance Testing
repo: TAMU-CPT/galaxy-workflow-import-tester
---

# Problem

I recently found that some of my org's old workflows were not importable
due to bad practices (changing tool IDs, deprecated tools, etc).

# Solution

Naturally, we threw together a simple tool to verify that all of the
workflows could safely be imported. Using a test user account, it runs:

{% highlight python %}
# Remove old workflows to ensure test only tests latest version of each
# workflow
remove_all_workflows()
# Import all public workflows
for workflow in import_shared_workflows():
    # Try accessing the JSON workflow representation. Bioblend throws an error when 
    try:
        workflow.get_json()
        xunit.ok()
    except Exception:
        xunit.fail()
{% endhighlight %}

# Jenkins Integration

We added JUnit output for easy Jenkins integration. [![Build Status](https://cpt.tamu.edu/jenkins/buildStatus/icon?job=galaxy-workflow-import-test)](https://cpt.tamu.edu/jenkins/job/galaxy-workflow-import-test/)

<div class="pure-g well">
	<div class="pure-u-1">
		<div class="l-box well-title">
			Jenkins Output
		</div>
	</div>
	<div class="pure-u-1" style="text-align:center">
		<img src="/assets/img/galaxy-testing-jenkins.png" width="100%" style="max-width: 602px"/>
	</div>
	<div class="pure-u-1">
		<div class="l-box">
			The failed test reuslts include the workflow name which
			allows you to easily track down the workflows which failed
			to import correctly. With Jenkins you can track failures
			over time, and send alerts when failures occur.
		</div>
	</div>
</div>
