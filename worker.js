// All inference happens inside this worker, on the user's device.
let generator,TextStreamer;
const notify=(type,extra={})=>self.postMessage({type,...extra});
self.onmessage=async({data})=>{try{
 if(data.type==='load'){
  const lib=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
  TextStreamer=lib.TextStreamer;
  lib.env.allowLocalModels=false;
  lib.env.useBrowserCache=true;
  // Single thread works without cross-origin isolation on GitHub Pages.
  lib.env.backends.onnx.wasm.numThreads=1;
  generator=await lib.pipeline('text-generation','onnx-community/SmolLM2-135M-Instruct-ONNX',{
   device:'wasm',dtype:'q8',progress_callback:p=>{
    if(p.status==='progress')notify('progress',{text:'Downloading '+(p.file||'model')+' · '+Math.round(p.progress||0)+'%'});
    else if(p.status==='initiate')notify('progress',{text:'Preparing '+(p.file||'model')+'…'});
   }
  });notify('ready');
 }
 if(data.type==='generate'){
  if(!generator)throw new Error('Load the model first.');
  const streamer=new TextStreamer(generator.tokenizer,{skip_prompt:true,skip_special_tokens:true,callback_function:text=>notify('token',{text})});
  const result=await generator(data.messages,{max_new_tokens:160,do_sample:false,repetition_penalty:1.1,return_full_text:false,streamer});
  const output=result[0].generated_text;
  const text=typeof output==='string'?output:output.at(-1)?.content;
  notify('done',{text});
 }
}catch(e){notify('error',{message:e.message||String(e),prompt:data.prompt})}};
