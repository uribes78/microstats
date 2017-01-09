const util = require('util');

// frequency: '2s'
module.exports.getFrequency = function(options) {
    let f = {}; 
    
    if(!options || !options.frequency) {
        f.mode = 'once';
        f.interval = 2000; // default 2s
        return f;
    }
    
    f.mode = options.frequency;
    if(options.frequency === 'once') {
        f.interval = 0;
        return f;
    }
    else if(options.frequency === 'onalert') {
        f.interval = 2000; // check for alert condition every 2 seconds
        return f;
    }
    else if(options.frequency.length !== 2 || isNaN(options.frequency[0])) {
        throw "Invalid frequency. Try something like 'once', 'onalert', '2m' or '1h'";   
    }
    
    f.mode = 'time';
    let n = parseInt(options.frequency[0]);
    let s = options.frequency[1];
        
    switch(s) {
        case 's': f.interval = n * 1000;
        case 'm': f.interval = n * 1000 * 60;
        case 'h': f.interval = n * 1000 * 60 * 60;
    }
    
    return f;
}

// memory: used: '>80%'
module.exports.getMemoryUsedAlertThreshold = function(memoptions) {
    if(!memoptions || !memoptions.used) return 0; // default 0%
    let u = memoptions.used;
    if(u.length < 3 || !u.includes('>') || !u.includes('%')) {
        throw "Invalid 'used' memory option. Try something like used: '>80%'"; 
    }
    
    return parseInt(u.split('>')[1].split('%')[0]);
}

// cpu: load: '>80%'
module.exports.getCpuLoadAlertThreshold = function(cpuoptions) {
    if(!cpuoptions || !cpuoptions.load) return 0; // default 0%
    let u = cpuoptions.load;
    if(u.length < 3 || !u.includes('>') || !u.includes('%')) {
        throw "Invalid 'load' cpu option. Try something like used: '>80%'"; 
    }
    
    return parseInt(u.split('>')[1].split('%')[0]);
}

// disk: filesystem/filesystems: '/dev/disk01'
// disk: filesystem/filesystems: ['/dev/disk01', '/dev/disk02']
module.exports.getDiskFilesystems = function(diskoptions) {
    filesystems = []
    if(!diskoptions || (!diskoptions.filesystem && !diskoptions.filesystems)) return null;
    let u = diskoptions.filesystem || diskoptions.filesystems;
    if(util.isArray(u)) filesystems = u;
    else filesystems.push(u);
    return filesystems;
}

// disk: mount/mounts: '/'
// disk: mount/mounts: ['/', '/home/sv']
module.exports.getDiskMounts = function(diskoptions) {
    mounts = []
    if(!diskoptions || (!diskoptions.mount && !diskoptions.mounts)) return null;
    let u = diskoptions.mount || diskoptions.mounts;
    if(util.isArray(u)) mounts = u;
    else mounts.push(u);
    return mounts;
}

// disk: used: '>80%'
module.exports.getDiskUsedAlertThreshold = function(diskoptions) {
    if(!diskoptions || !diskoptions.used) return 0; // default 0%
    let u = diskoptions.used;
    if(u.length < 3 || !u.includes('>') || !u.includes('%')) {
        throw "Invalid 'used' disk option. Try something like used: '>80%'"; 
    }
    
    return parseInt(u.split('>')[1].split('%')[0]);    
}