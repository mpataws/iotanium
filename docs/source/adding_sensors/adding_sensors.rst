03 - Adding Sensors
==============

Add Config Values to `hello_world.py`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- In your IoTanium repository, navigate to ``hello_world.py`` in the root directory, and open that file in a text editor.
- Edit the lines below, replacing the values with the correct values.  **all values are 100% lower case exactly as shown**::

    # config
    device_id = 'first_last'
    company_name = 'your_company_name'
    endpoint = 'aws_iot_endpoint_dns_hostname'

- **Save** the file, and close the text editor.


Upload files to your IoTanium device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Back in the WebREPL session in your browser, ensure your session is still active. Place your cursor in the REPL console, and press the **Enter** key several times.  If your session is active, each press should return a Python REPL prompt ``>>>``.  If not, click **Disconnect**, refresh the page, and reconnect as before.  Do not proceed until your WebREPL sesssion is active.

- Using the same **Choose File>>Send to device** method that you used during Setup to upload your WiFi connection info, transfer the following three files one at a time to the device:

1. The certificate provided by your instructor, ending in ``-certificate.pem.crt``
2. The private key provided by your instructor, ending in ``-private.pem.key``
3. The ``hello_world.py`` file, that you edited above.
    
- Ensure each file uploaded sucessfully, by listing the files in the WebREPL::

    >>> import os
    >>> os.listdir()
    ['boot.py', 'iotanium_cfg.json', 'ab12345678-certificate.pem.crt', 'ab12345678-private.pem.key', 'hello_world.py']
    >>> 

- If any uploaded file is missing from the list of files on the device, upload and list again until all three files are listed on the device.


Send 'Hello World!' to AWS IoT
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- In the WebREPL terminal, run the ``hello_world.py`` script, and notice the message publishing logs.  Note: to execute a script manually in Micropython, you ``import`` the script as a module, leaving off the ``.py`` extension as shown below.

    >>> import hello_world
    published to topic iotsample/company_name/first_last/data: {'message': 'Hello World from first_last'}
    published to topic iotsample/company_name/first_last/data: {'message': 'Hello World from first_last'}
    ...
    ...

- To stop sending messages, type ``CTRL+C`` in your WebREPL console terminal, you will see the execution break below, which is normal::

    Traceback (most recent call last):
    File "<stdin>", line 2, in <module>
    KeyboardInterrupt: 
    >>> 