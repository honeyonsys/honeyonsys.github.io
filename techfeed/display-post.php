<?php
if(@$mydata = new SimpleXMLElement(str_replace('META HTTP-EQUIV="refresh"','',$comedy_feed)))
		{
		foreach($mydata->channel->item as $x)
		{
		?>
		<div class="post">
			<div class="thumb">
				<img src="<?php echo $x->enclosure->attributes()->url; ?>" alt="comedy posts" />
			</div> 
			<div class="post_cont">
				<h2><?php echo $x->title; ?></h2><br />
				<div class="post_info"><?php echo $x->pubDate; ?></div><br /> 
				<?php echo $x->description; ?>
			</div>
			<a href="../single.php?url=<?php echo str_replace('"','',urlencode($x->guid)); ?>">Read Separate</a>
		</div>
<?php	}
		}
		else
		{
			echo "there is some error fetching data!";
		}
?>