<!-- start log messages -->
<table class="yiiLog" width="100%" cellpadding="2" style="border-spacing:1px;font:11px Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;color:#666666;">
	<tr>
		<th style="background:black;color:white;" colspan="5">
			Application Logs
		</th>
	</tr>
	<tr style="background-color: #ccc;">
	    <th style="width:120px">Timestamp</th>
		<th>Level</th>
		<th>Category</th>
		<th>Message</th>
	</tr>
	{{#data}}
	<tr>
		
		<td align="center">{{time}}</td>
		<td>{{level}}</td>
		<td>{{category}}}</td>
		<td>{{message}}</td>
	
	</tr>	
	{{/data}}
</table>
<!-- end of log messages -->