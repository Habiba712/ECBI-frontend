"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Scanner,
  useDevices,
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";
import { type } from "os";
import CameraIcon from "../../../public/svg/camera";

// import { Camera } from "lucide-react";
const styles = {
  container: {
    // width: 400,
    // margin: "auto",
  },
  controls: {
    marginBottom: 8,
  },
};

export default function ScannerPage() {
  const [deviceId, setDeviceId] = useState("");
  const [tracker, setTracker] = useState("");
  const [pause, setPause] = useState(false);
  const router = useRouter();

  const devices = useDevices();

  function getTracker() {
    switch (tracker) {
      case "outline":
        return outline;
      case "boundingBox":
        return boundingBox;
      case "centerText":
        return centerText;
      default:
        return undefined;
    }
  }

  const handleScan = async (data) => {
    setPause(true);
     console.log('data scan', data);

 try {
    if (!data) return;
    const scannedUrl = typeof data === 'string' ? data : data.text ?? data.data ?? '';

    // Optional: strip accidental double https
    const fixedUrl = scannedUrl.replace(/^https?:\/\/https?:\/\//, 'https://');

    console.log('Navigating to:', fixedUrl);
    window.location.href = fixedUrl;
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointOfSaleQrCode/${parsed.id}`,
      //   {
      //       headers: {
      //           'Content-Type': 'application/json'
      //       },
      //       method: "GET",
      //       credentials: 'include',
      //   }
      // );
      // const result = await response.json();

      // if (response.ok && result.success) {
      //   router.push(`/pages/posts/createPost`);
      // } else {
      //   alert(result.message);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setPause(false);
    }

   
  };
 const ScanModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-64 h-64 border-4 border-white rounded-xl mb-4 flex items-center justify-center mx-auto">
          <CameraIcon size={64} className="text-white animate-pulse" />
        </div>
        <p className="text-white text-lg font-semibold">Scanning QR Code...</p>
        <p className="text-gray-300 text-sm mt-2">Point camera at restaurant QR code</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen h-full max-w-md mx-auto px-4 py-2 w-full  flex flex-col justify-center items-center overflow-scroll mb-10" style={styles.container}>
      {/* <div style={styles.controls}>
        <select onChange={(e) => setDeviceId(e.target.value)}>
          <option value={undefined}>Select a device</option>
          {devices.map((device, index) => (
            <option key={index} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
        <select
        //   style={{ marginLeft: 5 }}
          onChange={(e) => setTracker(e.target.value)}
        >
          <option value="centerText">Center Text</option>
          <option value="outline">Outline</option>
          <option value="boundingBox">Bounding Box</option>
          <option value={undefined}>No Tracker</option>
        </select>
      </div>
      <Scanner
        formats={[
          "qr_code",
          "micro_qr_code",
          "rm_qr_code",
          "maxi_code",
          "pdf417",
          "aztec",
          "data_matrix",
          "matrix_codes",
          "dx_film_edge",
          "databar",
          "databar_expanded",
          "codabar",
          "code_39",
          "code_93",
          "code_128",
          "ean_8",
          "ean_13",
          "itf",
          "linear_codes",
          "upc_a",
          "upc_e",
        ]}
        constraints={{
          deviceId: deviceId,
        }}
        onScan={(detectedCodes) => {
          handleScan(detectedCodes[0].rawValue);
        }}
        onError={(error) => {
          console.log(`onError: ${error}'`);
        }}
        className="scanner rounded-lg shadow-lg mb-4 border border-red-500"  
        styles={{ container: 
          { height: "350px",
            width: "350px",
            borderRadius: "50px",
            border:"2px solid lightgray"
          } }}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
          tracker: getTracker(),
        }}
        allowMultiple={true}
        scanDelay={2000}
        paused={pause}
      /> */}
      {!pause && <ScanModal 
         onScan={(detectedCodes) => {
          handleScan(detectedCodes[0].rawValue);
        }}
        onError={(error) => {
          console.log(`onError: ${error}'`);
        }}
      />}
       </div>
  );
}