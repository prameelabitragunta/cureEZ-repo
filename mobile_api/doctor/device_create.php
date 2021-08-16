<?php 
/**
* Module : Device Entry
* Author: Prasenjit Behera
* prasenjit.wayindia@gmail.com
* Created On : 2020-01-15
*
**/
header("Access-Control-Allow-Origin: *");
include '../dbCon.php';
$resp =array();
if($_SERVER['REQUEST_METHOD']=='POST')
{
    $device_id = $_POST['device_id'];
    $device_token = $_POST['device_token'];
    $doctor_id = $_POST['doctor_id'];
    if(!empty($device_id) && !empty($device_token) )
    {
        $device_chk = "SELECT * FROM `doctor_device_data` WHERE doctor_id='$doctor_id'";
        $device_data = mysqli_fetch_assoc( mysqli_query($con,$device_chk) ); 
        if(count($device_data) > 0)
        {
            $index_id = $device_data['id'];
            //checking token is same or not
            if($device_data['device_token'] ==  $device_token){
                //nothing to do
                $resp['status'] = 1;
                $resp['message'] = 'Your data is available';
            }
            else
            {
                ///update token id
                $device_update = "UPDATE `doctor_device_data` SET `device_token`='$device_token',`device_id`='$device_id' WHERE doctor_id = '$doctor_id'";
                if(mysqli_query($con,$device_update))
                {
                    $resp['status'] = 1;
                    $resp['message'] = 'Device Data Successfully Updated';
                }
                else{
                    $resp['status'] = 0;
                    $resp['message'] = 'something Error in update Try Again'; 
                }  
            }
        }
        else
        {
            ///inserting New Device
            $device_create= "INSERT INTO `doctor_device_data` (`device_id`,`device_token`,`doctor_id`) VALUES ('$device_id','$device_token', '$doctor_id')";
            $result=mysqli_query($con,$device_create);
            if($result)
            {
                $resp['status'] = 1;
                $resp['message'] = 'Device Data Successfully Created';
            }
            else{
                $resp['status'] = 0;
                $resp['message'] = 'Something Error in Create Device, Try Again'; 
            }
        }
    }else{
            $resp['status'] = 0;
            $resp['message'] = 'All Field Required';
    }
}else{
        $resp['status'] = 0;
        $resp['message'] = 'Server Request Error';
}
echo json_encode($resp,JSON_UNESCAPED_UNICODE);
mysqli_close($con);