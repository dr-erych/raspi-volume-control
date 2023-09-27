# raspi-volume-control

To be able to run it on port 80, do the following:

```bash
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
```
