var context = new AudioContext();
    oscillator = null;
    mousedown = false; 
    gainNode = context.createGain();

    document.body.addEventListener('mousemove', function(e){
        if(mousedown){
            calculateFrequencyAndGain(e);
        }
       
    });

    document.body.addEventListener('mouseDown', function(e){
       mousedown = true;

       oscillator = context.createOscillator();
       oscillator.connect(gainNode);
       gainNode.connect(context.destination);

        calculateFrequencyAndGain(e);

        oscillator.start(context.currentTime);
    });

    document.body.addEventListener('mouseUp', function(e){
       mousedown = false;

       if(oscillator){
           oscillator.stop(context.currentTime);
           oscillator.disconnect();
       }
    });
    
function calculateFrequencyAndGain(e){
    var maxFrequency=2000,
        minFrequency=20,
        maxGain=1,
        minGain=0;
    
    oscillator.frequency.value=((e.clientX/window.innerWidth)*maxFrequency)+minFrequency;
    gainNode.gain.value =((e.clientY/window.innerHeight)*maxGain)+minGain;

    oscillator.frequency.setTargetAtTime((((e.clientX/window.innerWidth)*maxFrequency)+minFrequency), context.currentTime, 0.01);
} 
