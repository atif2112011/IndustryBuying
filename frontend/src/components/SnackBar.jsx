import { Snackbar } from "@mui/material";

function SnackBar({openSnackBar,setopenSnackBar,message,setMessage})
{
     const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopenSnackBar(false);
    setMessage("");
  };
    return(
        <>
        <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        message={message}
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
        onClose={handleClose}
      />
        </>
    )
}
export default SnackBar