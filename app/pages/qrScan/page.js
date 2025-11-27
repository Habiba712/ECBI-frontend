"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Scanner,
  useDevices,
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";

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
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointOfSaleQrCode/${data}`
      );
      const result = await response.json();

      if (response.ok && result.success) {
        router.push(`/pages/posts/creaePost`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPause(false);
    }
  };

  return (
    <div className="min-h-screen h-full max-w-md mx-auto px-4 py-2 w-full border border-gray-500 flex flex-col justify-center items-center overflow-scroll mb-10" style={styles.container}>
      <div style={styles.controls}>
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
        styles={{ container: { height: "350px", width: "350px" } }}
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
      />
      <div className="flex justify-center items-center w-full">
        <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500"
          onClick={() => handleDownloadQRCode()}
        >
          Download QR Code
        </button>
      </div>
        <div className="flex justify-center items-center w-full">
        <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500"
          onClick={() => handleDownloadQRCode()}
        >
          Download QR Code
        </button>
      </div>

  <div className="flex justify-center items-center w-full">
        <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500"
          onClick={() => handleDownloadQRCode()}
        >
          Download QR Code
        </button>
      </div>    </div>
  );
}