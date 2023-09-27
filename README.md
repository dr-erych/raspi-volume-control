# raspi-volume-control

To be able to run it on port 80, do the following:

```bash
$ sudo apt-get install libcap2-bin
$ sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
```

Install as system service:
```bash
$ git clone https://github.com/dr-erych/raspi-volume-control.git
$ cd raspi-volume-control
$ sudo ln -s ${PWD}/volume-control.service /etc/systemd/system/volume-control.service
$ sudo systemctl enable myapp
$ sudo systemctl start myapp
```

You can then call the following web routes:  
`http://<ip-of-your-raspberry-pi>/` --> status  
`http://<ip-of-your-raspberry-pi>/volume-up`  
`http://<ip-of-your-raspberry-pi>/volume-down`  
`http://<ip-of-your-raspberry-pi>/volume-toggle-mute`  

