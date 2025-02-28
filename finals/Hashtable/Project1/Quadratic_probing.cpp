#include<iostream>
using namespace std;

class Hash_table 
{
	int size;
	int* table;

public:
	Hash_table(int size)
	{
		this->size = size;
		table = new int[size];
		for (int i = 0; i < size; i++)
		{
			table[i] = -1;
		}
	}

	int hash_index(int key)
	{
		return (key % size);
	}
	void insert(int value)
	{
		int index = hash_index(value);
		int i = 0;

		while (table[(index + i * i) % size]!=-1)
		{
			i++;
			if (i == size) 
			{
				cout << "Table is full, can't insert " << endl;
				return;
			}
		}
		table[(index + i * i) % size] = value;

	}

	void search(int value)
	{
		int index = hash_index(value);
		int i = 0;

		while (table[(index + i * i) % size] != -1)
		{
			if (table[(index + i * i) % size] == value)
			{

				cout << "Value found..!" << endl;
				return;
			}
			i++;

			if (i == size);
			{
				break;
			}


		}

		cout << "Value not found..!" << endl;
		return;



	}

	void print()
	{

		for (int i = 0; i < size; i++)
		{
			cout << table[i] << endl;
		}


	}


};