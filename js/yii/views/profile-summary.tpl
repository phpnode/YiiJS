<!-- start profiling summary -->
<table class="yiiLog" width="100%" cellpadding="2" style="border-spacing:1px;font:11px Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;color:#666666;">
	<tr>
		<th style="background:black;color:white;" colspan="6">
			Profiling Summary Report
			(Time: {{data.time}}s)
		</th>
	</tr>
	<tr style="background-color: #ccc;">
	    <th>Procedure</th>
		<th>Count</th>
		<th>Total (s)</th>
		<th>Avg. (s)</th>
		<th>Min. (s)</th>
		<th>Max. (s)</th>
	</tr>
	{{#data.entries}}
	<tr>
		<td>{{proc}}</td>
		<td align="center">{{count}}</td>
		<td align="center">{{total}}</td>
		<td align="center">{{average}}</td>
		<td align="center">{{min}}</td>
		<td align="center">{{max}}</td>
	</tr>
	{{/data.entries}}

</table>
<!-- end of profiling summary -->