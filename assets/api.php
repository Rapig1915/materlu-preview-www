<?php

	if( isset($_POST['utm_source']) ){		
		foreach($_POST as $key => $value ){
			$$key = $value;
		}
	}

	// SMART4ADS //
	if ( $utm_source = "smart4ads" ){
		
		$temp = explode("-",$order_id);
		$order_id = $temp[0];
		
		$code = file_get_contents( 'http://admin.materlu.com/api/check-conversion?orderid='.$order_id.'&trackid='.$trackid.'&network='.$utm_source );
		
		if( $code == 1 || $force == "JSV" ) {
			if( $force == "JSV" ) $code = 2;
			$rc = file_get_contents( 'https://www.smart4ads.com/smart4ads/api/s2s.php?accountid=68be7e0d&campaignid=fdb166b6&totalcost='.$coste.'&actioncode=Materlu_CPA&orderid='.$order_id.'&clickid='.$trackid );
		}
		$log  = date("Y-m-d H:i:s")."|$utm_source|$trackid|$order_id|$coste|$code|$rc|".PHP_EOL;
		file_put_contents('./smart4ads_'.date("Ymd").'.log', $log, FILE_APPEND);

	}
	
?>
