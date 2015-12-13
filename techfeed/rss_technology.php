<?php
//header('Content-Type: text/xml');  
header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0"?>  
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>  
<title>honeyonsys.github.io/techfeed</title>  
<description>Daily News from honeyonsys.github.io</description>  
<atom:link href="http://honeyonsys.github.io/techfeed/rss_technology.php" rel="self" type="application/rss+xml" />
<link>http://honeyonsys.github.io</link>';  
$article_comedy = file_get_contents('http://www.huffingtonpost.com/feeds/verticals/technology/news.xml');

if(@$article = new SimpleXMLElement(str_replace('META HTTP-EQUIV="refresh"','',$article_comedy)))
{
  
foreach($article->channel->item as $x)
{        
    echo '  
       <item>  
          <title>'.htmlspecialchars($x->title).'</title>  
          <description><![CDATA[ '. substr(htmlspecialchars($x->description), 0,250).' ]]></description>  
          <link>http://honeyonsys.github.io/techfeed/single.php?url='.str_replace('"','',urlencode($x->guid)).'</link>  
          <guid>http://honeyonsys.github.io/techfeed/single.php?url='.str_replace('"','',urlencode($x->guid)).'</guid>
		  <pubDate>'.date('D, d M Y h:i:s',strtotime($x->pubDate)).' GMT</pubDate>
       </item>';  
}  
}
echo '</channel>  
</rss>';
?>  
