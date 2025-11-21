import { useState } from "react";

const EVO = ['EVO P90','EVO M60','EVO MP5','EVO GROZA','EVO M10 RED','EVO MP40 BLUE','EVO XM8','EVO AK','EVO MP40','EVO M4A1'];
const NORMAL = ['100 Level','Hello!','LOL','Provoke','Applause','Dab','Chicken','Arm Wave','Shoot Dance','Baby Shark'];

export default function Home() {
  const [team, setTeam] = useState("");
  const [uids, setUids] = useState(["","","",""]);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("Idle");

  function setUid(index, value){
    const copy = [...uids]; copy[index] = value; setUids(copy);
  }

  function appendLog(text){
    setLogs(l => [`${new Date().toLocaleTimeString()} • ${text}`, ...l].slice(0,200));
  }

  function handleEmote(name){
    const payload = { team: team || "—", uids: uids.filter(Boolean), emote: name, ts: Date.now() };
    appendLog("Prepared: " + JSON.stringify(payload));
    setStatus("Local only");
    // OPTIONAL: send to your backend
    // fetch('/api/send', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  }

  return (
    <main className="min-h-screen flex items-start justify-center py-8 px-4">
      <div className="w-full max-w-6xl">
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-800 to-sky-800 flex items-center justify-center text-white font-bold">SB</div>
          <div>
            <h1 className="text-xl font-semibold">SHazz Panels — Demo</h1>
            <p className="text-sm text-sky-200">UI demo • Safe & local</p>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* left */}
          <section className="bg-card rounded-xl p-5 border border-white/5 shadow-lg">
            <label className="text-sm text-sky-200 block">Team Code</label>
            <input value={team} onChange={(e)=>setTeam(e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-white/3 border border-white/5 text-white" placeholder="Enter Team Code" />

            <label className="text-sm text-sky-200 block mt-4">UIDs</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {uids.map((u,i)=>(
                <input key={i} value={u} onChange={(e)=>setUid(i,e.target.value)} placeholder={`UID ${i+1}`} className="p-3 rounded-lg bg-white/3 border border-white/5 text-white"/>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sky-100 font-semibold mb-3">EVO EMOTES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EVO.map(item=>(
                  <div key={item} className="flex items-center justify-between bg-white/2 p-3 rounded-lg border border-white/3">
                    <div className="text-white">{item}</div>
                    <button onClick={()=>handleEmote(item)} className="px-3 py-1 rounded-full bg-gradient-to-br from-accent1 to-accent2 text-white font-medium shadow">Active</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sky-100 font-semibold mb-3">NORMAL EMOTES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NORMAL.map(item=>(
                  <div key={item} className="flex items-center justify-between bg-white/2 p-3 rounded-lg border border-white/3">
                    <div className="text-white">{item}</div>
                    <button onClick={()=>handleEmote(item)} className="px-3 py-1 rounded-full bg-gradient-to-br from-accent1 to-accent2 text-white font-medium shadow">Active</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* right */}
          <aside className="bg-gradient-to-b from-white/2 to-white/3 rounded-xl p-5 border border-white/5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Preview</h2>
                <p className="text-sm text-sky-200">Selected team and last action</p>
              </div>
              <div className="text-sm text-sky-200">Status: <span className="font-medium text-white">{status}</span></div>
            </div>

            <div className="mt-4 space-y-2 text-sky-50">
              <div><strong>Team:</strong> <span className="ml-2 text-white">{team || "—"}</span></div>
              <div><strong>UIDs:</strong> <span className="ml-2 text-white">{uids.filter(Boolean).join(", ") || "—"}</span></div>
            </div>

            <div className="mt-4">
              <div className="bg-black/20 rounded-lg p-3 h-64 overflow-auto font-mono text-sm text-sky-100">
                {logs.length === 0 ? <div className="text-sky-400">Ready.</div> : logs.map((l,i)=> <div key={i} className="mb-1">{l}</div>)}
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <div className="text-sky-400 text-sm">Fath Fath • Demo</div>
              <div>
                <button onClick={()=>{ setLogs([]); appendLog('Log cleared'); }} className="px-3 py-1 rounded bg-white/5 text-white">Clear</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
