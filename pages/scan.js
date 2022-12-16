import { useHtml5QrCodeScanner } from 'react-html5-qrcode-reader';
import React,{ useState }  from 'react';
function Scan() {
  const [data, setData] = useState("No result");
  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(
    'url to the .min.js (see examples).'
  );

  useEffect(() => {
    if (Html5QrcodeScanner) {
      // Creates anew instance of `HtmlQrcodeScanner` and renders the block.
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
      html5QrcodeScanner.render(
        (data: any) => console.log('success ->', data), 
        (err: any) => console.log('err ->', err)
      );
    }
  }, [Html5QrcodeScanner]);
  return (
    <div id='reader'></div>
  );
}

export default Scan;