# Notes for adding ethnicity

File names are the same except for adding an ethnicity suffix

- _EthAll
- _EthAsi
- _EthBla
- _EthHis
- _EthOth
- _EthWhi

Ethnicities
- All
- Asian
- Black
- Hispanic
- Other
- White

```python
RACE_SUFFIXES = {
    "all": {
        
    }
}


def input_file_suffix_for_race(race):
 return RACE_SUFFIXES[race]
```
