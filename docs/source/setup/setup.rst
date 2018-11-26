01 - Setup
==============

Unboxing and Assembly
--------------------- 
- If you have not done so already, unbox and assemble your IoTanium Developer Kit using the instructions provided below (click image to enlarge):

.. image:: ../img/assembly.png
    :width: 2550px
    :align: center
    :alt: img/assembly.png

- Power your device by first connecting the small end of the micro-usb cable to the micro-usb port on the IoTanium board, and then connecting the large end of the cable to either a standard USB port, or the USB wall adapter provided.
----

Connect to Your Device
---------------------
You IoTanium development board comes pre-flashed with an optimized version of `Micropython <http://micropython.org/>`_, a lean and efficient implementation of the Python 3 programming language that includes a small subset of the Python standard library, and is optimised to run on microcontrollers and in constrained environments.  Python utilizes a interactive 'Read-Evaluate-Print-Loop' (REPL) as a programming interface, which takes single user inputs or expressions, evaluates them, and returns the results to the user.  The REPL provides an interactive ``>>>`` prompt when working with Python directly in a command line terminal.

Your IoTanium device includes a version of the Python REPL called the WebREPL, which can be used to interact with the device in a web browser over WiFi.  The section below will cover configuring your device for your local WiFi network, and connecting to your device via the WebREPL:


1 - Download or Clone Repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- **Direct Download**
   - Download the IoTanium Git repository `here <https://github.com/onicagroup/iotanium/archive/preview.zip>`_.
   - Unzip the downloaded file on your local workstation
- **Git Clone**
   - Git users can clone the repository directly: ``git clone -b preview https://github.com/onicagroup/iotanium.git``

2 - Connect to Access Point
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Find the small rectangular LED labelled `STATUS`, it is located just above the blue button on the IoTanium device.  The STATUS LED is used to indicate when the device enters Access Point (AP mode), which will allow your workstation to connect to the device via WiFi.
- Briefly unplug the power from the device, and plug it back in.  After a moment, the STATUS LED will blink rapidly for 5 seconds, indicating AP mode.
- Connect your workstation WiFi to the network named ``IoTanium-######``, with password ``iotanium``

3 - Connect to the WebREPL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- In the root of repository you downloaded in step 1 above, browse to ``webrepl/webrepl.html``, and open the .html file in a browser.
- Accept the default values, and click the **Connect** button.
- When prompted, provide password ``iotanium`` (password will not show while typing, this is normal)
- After authenticating successfully, you will be presented with a MicroPython interactive WebREPL session::

    Welcome to MicroPython!
    Password:
    WebREPL connected
    >>>

3 - Upload WiFi Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Browse to the file named ``iotanium_cfg.json`` in the repository, and open it in a text editor.
- Replace the three default values with those for your local WiFi network, keep other values and formatting of the file unchanged, example::

    # original file
    {
        "wlans": [{
                "friendly_name": "friendly_name",
                "essid": "wifi_ssid",
                "passwd": "wifi_password"
            }
        ]
    }

    # becomes (example)
    {
        "wlans": [{
                "friendly_name": "my home wifi",
                "essid": "ATT288-5G",
                "passwd": "hunter2"
            }
        ]
    }

- **Save the file**
- Back in your WebREPL browser window, click **Choose File**, browse to the saved file above, and click **Send to device**
- Ensure your WebREPL indicates ``Sent iotanium_cfg.json, 199 bytes`` or similar message, before continuing (your file's size in bytes may be different):

.. image:: ../img/upload_wifi_cfg.png
    :width: 400px
    :align: center 
    :alt: ../img/upload_wifi_cfg.png

4 - Connect Device to WiFi
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- In the WebREPL console, run ``iotanium.setup()`` and observe the output, similar to that below::

    >>> iotanium.setup()
    config file ./iotanium_cfg.json found
    wifi scanning
    found wlan ATT288-5G
    connecting to wlan my home wifi/ATT288-5G...
    connection to wlan my home wifi/ATT288-5G successful! To continue:
    1. reconnect your workstation to wifi network: ATT288-5G
    2. once reconnected, connect to webrepl on:
    ws://192.168.1.243:8266/                               
    >>>   

- Copy the WebREPL target value from your console output, similar to ``ws://192.168.1.243:8266/``, being careful to include the ``ws://`` and the trailing ``/``. Note that your output will be a similar format, but a differnet address.  **IMPORTANT: Losing this value will require entering Safe Mode, and repeating steps 2-4!**, so consider saving this value in a text file to avoid having to repeat the steps above.

5 - Connect to the WebREPL over WiFi
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Click **Disconnect** in the WebREPL browser window.
- Disconnect your workstation from the ``IoTanium-######`` wireless network.
- Reconnect your workstation to your local WiFi network.
- **Refresh** the WebREPL page in your browser.
- In the connection field at the top of the WebREPL page, paste the value you copied in step 4 above.
- Click the **Connect** button, and provide password ``iotanium`` when prompted.  You should now be connected to your device via WebREPL over your wifi::

    Welcome to MicroPython!
    Password: <masked>
    WebREPL connected
    >>>