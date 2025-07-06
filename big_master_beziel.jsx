// BIG Master BEZIEL - Anonymous AI Mastering Interface

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function BezielMastering() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [enhancedAvailable, setEnhancedAvailable] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setAnalysis(null);
    setEnhancedAvailable(false);
  };

  const simulateProcessing = () => {
    setProcessing(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setProcessing(false);
        setEnhancedAvailable(true);
        // Simulated analysis result
        setAnalysis({
          loudness: "-12.3 LUFS",
          dynamicRange: "10.5 dB",
          notes: [
            "Bass is clean but slightly overpowering at 60Hz.",
            "Vocals are crisp – nice job!",
            "Consider widening the stereo field between 4kHz–10kHz."
          ]
        });
      }
    }, 300);
  };

  const downloadEnhanced = () => {
    // Placeholder for mastered version generation
    const blob = new Blob(["Simulated enhanced master output"], {
      type: "audio/wav",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "BIG_Master_BEZIEL_Enhanced.wav";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-white text-white p-4 relative overflow-hidden">
      <div className="absolute left-2 top-4 z-0 opacity-10">
        <img src="/rwanda-flag.png" alt="Rwanda Flag" className="w-16 rotate-[-10deg]" />
      </div>

      <h1 className="text-5xl font-extrabold text-gold text-center mb-4 animate-pulse font-serif italic tracking-tighter relative z-10">
        BIG Master BEZIEL
      </h1>

      <div className="max-w-xl mx-auto relative z-10">
        <Card className="bg-white/5 border border-white/10 backdrop-blur">
          <CardContent className="p-4">
            <label className="text-sm text-white/80">Upload your mix:</label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                type="file"
                accept="audio/*"
                className="bg-white text-black"
                onChange={handleFileChange}
              />
              <Button
                disabled={!file || processing}
                onClick={simulateProcessing}
                className="bg-gold text-black hover:bg-gold/80"
              >
                <UploadCloud className="mr-2 w-4 h-4" /> Analyze
              </Button>
            </div>
            {processing && (
              <div className="mt-4">
                <p className="text-sm text-white/70 mb-2">Analyzing your mix...</p>
                <Progress value={progress} className="bg-white/20 h-2" />
              </div>
            )}
            {analysis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                <h2 className="text-xl font-semibold text-gold">Analysis Report</h2>
                <p>Loudness: {analysis.loudness}</p>
                <p>Dynamic Range: {analysis.dynamicRange}</p>
                <ul className="list-disc list-inside text-sm text-white/70">
                  {analysis.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
                {enhancedAvailable && (
                  <div className="mt-4">
                    <p className="text-white/80 text-sm mb-2">🎧 Want to hear how BEZIEL would enhance your track?</p>
                    <Button
                      className="bg-gold text-black hover:bg-gold/80"
                      onClick={downloadEnhanced}
                    >
                      🔥 Download Enhanced Master
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hidden signature */}
      <span className="absolute bottom-1 right-2 text-[8px] text-white/10 select-none">
        by King Rutega
      </span>
    </div>
  );
}
