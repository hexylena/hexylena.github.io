---
layout: post
author: Helena
tags:
- dev
title: "Simple Sleep Efficiency Calculator"
blurb: Math with hours is hard and girls¹ be eepy
---

Trying to keep sleep efficiency above 90% for sanity reasons. I'm a fan of <abbr title="total sleep time">TST</abbr> as the denominator rather than <abbr title="time in bed">TIB</abbr> because yeah *obviously* people use phones in bed before sleep[^1].

Anyway, fill in whatever numbers you feel like. You can use e.g. `830` and it will be parsed as 8h30m

<table>
<thead>
    <tr>
        <th>
        Type
        </th>
        <th>
        Input
        </th>
        <th>
        Parsed (minutes)
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>
            <label for="tst">Total Sleep Time</label>
        </td>
        <td>
            <input type="text" name="tst" id="tst" />
        </td>
        <td>
            <span id="tst-parsed" aria-live="polite"></span>
        </td>
    </tr>
    <tr>
        <td>
            <label for="dse">Duration of Sleep Episode</label>
        </td>
        <td>
            <input type="text" name="dse" id="dse" />
        </td>
        <td>
            <span id="dse-parsed" aria-live="polite"></span>
        </td>
    </tr>
</tbody>
</table>

**Result**: <span id="eff" aria-live="polite"></span>


<script>
function calc(){
    let tst = document.getElementById("tst").value;
    let tst_total = null;
    if (tst){
        let tst_hour = tst.substring(0, 1),
            tst_mins = tst.substring(1) || 0;
        tst_total = parseInt(tst_hour) * 60 + parseInt(tst_mins);

        document.getElementById("tst-parsed").innerHTML = `${tst_hour}h ${tst_mins}m (${tst_total}m)`
    }

    let dse = document.getElementById("dse").value;
    let dse_total = null;
    if (dse){
        let dse_hour = dse.substring(0, 1),
            dse_mins = dse.substring(1) || 0;
        dse_total = parseInt(dse_hour) * 60 + parseInt(dse_mins);

        document.getElementById("dse-parsed").innerHTML = `${dse_hour}h ${dse_mins}m (${dse_total}m)`
    }

    if(tst_total !== null && dse_total !== null) {
        document.getElementById("eff").innerHTML = (100.0 * tst_total / dse_total).toString().substring(0,5);
    }
}


const otherInputs = document.querySelectorAll('input[type="text"]');
otherInputs.forEach((input) => {
	addEventListener("change", (event) => {
		calc()
	})
});


</script>



[^1]: [PMC4751425](https://pmc.ncbi.nlm.nih.gov/articles/PMC4751425/)

