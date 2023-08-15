exports.getIP = (req, res, next) => {
    //  const ip = req.connection.remoteAddress
    const ip = req.socket.remoteAddress
    const ipv2 = ip.split(':')
    const ipOk = ipv2[ipv2.length - 1]
    return ipOk
}