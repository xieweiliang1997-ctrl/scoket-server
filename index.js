import { log } from "console";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: '*'
	}
});



io.on("connection", (socket) => {
	socket.emit('connectionSuccess')
	socket.on("joinRoom", (roomId) => {
		socket.join(roomId)
	});
	socket.on("callRemote", (roomId) => {
		console.log("通知用户", roomId);
		io.to(roomId).emit('callRemote')
	});
	socket.on('acceptCall', (roomId) => {
		console.log("发起通话");
		io.to(roomId).emit('acceptCall')
	})
	socket.on('sendOffer', ({ offer, roomId }) => {
		console.log("收到offer", roomId);
		io.to(roomId).emit('sendOffer', offer)
	})
	socket.on('sendAnswer', ({ answer, roomId }) => {
		console.log("收到answer", roomId);

		io.to(roomId).emit('sendAnswer', answer)
	})

	socket.on('sendCandidate', ({ candidate, roomId }) => {
		console.log("收到Candidate", roomId);
		io.to(roomId).emit('sendCandidate', candidate)
	})
});

httpServer.listen(3000);